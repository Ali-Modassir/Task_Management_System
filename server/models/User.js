const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
  local: {
    name: {
      type: String,
    },
    email: {
      type: String,
      validate: [isEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Minimum password length is 6 characters"],
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      required: true,
    },
    secretToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  google: {
    id: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  if (this.method != "local") {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.local.password = await bcrypt.hash(this.local.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ "local.email": email });
  if (user) {
    const auth = await bcrypt.compare(password, user.local.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

exports.User = User;
exports.userSchema = userSchema;
