const jwt = require("jsonwebtoken");
const async = require("async");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const UserModel = require("../models/User"); //Model
const HttpError = require("../misc/HttpError"); //Helper function for Handle error
const sendEmail = require("../config/nodemailer"); //nodemailer
const emailTemplates = require("../config/nodemailerMailTemps"); //nodemailer-email-templates

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  // incorrect credentials
  if (
    err.message === "incorrect email" ||
    err.message === "incorrect password"
  ) {
    return new HttpError("Credentials seem to be wrong.", 401);
  }

  // validation errors
  else if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //Any unknown err
  else {
    return new HttpError(
      err.message || "Something went wrong, Signing up failed",
      500
    );
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

//SignUp Controller
module.exports.signup_post = async (req, res, next) => {
  try {
    const { name, email, password, VE_Employee } = req.body;
    const exsistingUser = await UserModel.User.findOne({
      "local.email": email,
    });
    if (exsistingUser) {
      res.json({ message: "User Already Registered, Please Login", ok: false });
    }
    const userType = VE_Employee ? "VE" : "client";
    const user = await new UserModel.User({
      method: "local",
      local: { name, email, password, userType },
    });
    await user.save(); //Saved-User-Data

    //Sending-Confirmation-Email
    await sendEmail(
      email,
      emailTemplates.confirmEmailTemp(user._id, user.local.name)
    );

    res.status(201).json({
      message: "Email sent, Please check your inbox to confirm",
      ok: true,
    });
  } catch (err) {
    const errors = handleErrors(err);
    return next(errors);
  }
};

//Email Confirmation
module.exports.confirmEmail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.User.findById(id);
    if (user && !user.local.confirmed) {
      const confirmedUser = await UserModel.User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            "local.confirmed": true,
          },
        }
      );
      if (confirmedUser) {
        const token = createToken(confirmedUser._id);
        res.json({
          userId: confirmedUser._id,
          userName: confirmedUser.local.name,
          userEmail: confirmedUser.local.email,
          userType: confirmedUser.local.userType,
          token: token,
          ok: true,
          message: "Email Confirmed, Account Successfully Created",
        });
      } else {
        res.json({ message: "User Not found", ok: false });
      }
    } else {
      res.json({ message: "Email Already Confirmed", ok: false });
    }
  } catch (err) {
    const errors = handleErrors(err);
    return next(errors);
  }
};

//Login Controller
module.exports.login_post = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.User.login(email, password);
    if (!user.local.confirmed) {
      res.status(403).json({
        message: "Email not Confirmed. Please check your email account",
        ok: false,
      });
    } else {
      const token = createToken(user._id);
      res.status(201).json({
        userId: user._id,
        userName: user.local.name,
        userEmail: user.local.email,
        userType: user.local.userType,
        token,
        ok: true,
        message: "Logged In Successfully",
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    return next(errors);
  }
};

//Forgot password Controller
module.exports.forgotPassword = function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    function (token, done) {
      UserModel.User.findOneAndUpdate(
        { "local.email": req.body.email },
        {
          $set: {
            "local.resetPasswordToken": token,
            "local.resetPasswordExpires": Date.now() + 3600000, //1 hour
          },
        },
        function (err, user) {
          if (!user) {
            return next(new HttpError("No user with that email exsists", 404));
          }
          done(err, token, user);
        }
      );
    },
    async function (token, user, done) {
      try {
        //Sending-Reset-Password-Email
        await sendEmail(
          user.local.email,
          emailTemplates.forgotPswdTemp(token, user.local.name)
        );

        res.status(201).json({
          message: "Email Successfully Sent. Please check your email account",
          ok: true,
        });
      } catch (err) {
        const errors = handleErrors(err);
        return next(errors);
      }
    },
  ]);
};

//Reset Password
module.exports.resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const pswd = req.body.password;
  const confpswd = req.body.confirmPassword;
  if (pswd !== confpswd) {
    res.json({ message: "Password Not Matching" });
  }
  try {
    const hashPswd = await bcrypt.hash(pswd, 10);

    const user = await UserModel.User.findOneAndUpdate(
      {
        "local.resetPasswordToken": token,
        "local.resetPasswordExpires": { $gt: Date.now() },
      },
      {
        $set: {
          "local.password": hashPswd,
          "local.confirmed": true,
          "local.resetPasswordToken": undefined,
          "local.resetPasswordExpires": undefined,
        },
      }
    );
    if (!user) {
      return next(
        new HttpError("Password reset token has expired or is invalid", 400)
      );
    } else {
      //Sending-Success-Email
      await sendEmail(
        user.local.email,
        emailTemplates.pswdChangeTemp(user.local.name, user.local.email)
      );

      res.json({
        message: "Password Successfully Changed",
        ok: true,
      });
    }
  } catch (error) {
    const errors = handleErrors(error);
    return next(errors);
  }
};

//get user_details_by_id
module.exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.User.findById(id);
  if (user) {
    const jwttoken = createToken(id);
    const data = {
      userType: user.local.userType,
      userName: user.local.name,
      userEmail: user.local.email,
      userId: id,
      token: jwttoken,
    };
    res.json(data);
  } else {
    res.json({ message: "User Not found", ok: false });
  }
};
