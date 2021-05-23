import React from "react";
import classes from "../assets/css/index_layout.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.f_sec1}>
        <h3>Encomece</h3>
        <p>
          Provide you with the best consultation on your startup plan. We lend
          you our best employees who work as a virtual employee for you to drive
          your business and take up ownership of your results.
        </p>
      </div>
      <div className={classes.f_sec2}>
        <h3 style={{ marginBottom: "27px" }}>Follow Us</h3>
        <i
          style={{ fontSize: "26px", color: "royalblue" }}
          className="fab fa-facebook-f"
        ></i>
        &nbsp;&nbsp;
        <i
          style={{ fontSize: "26px", color: "#0e76a8" }}
          className="fab fa-linkedin"
        ></i>
        &nbsp;&nbsp;
        <i
          style={{ fontSize: "26px", color: "#00acee" }}
          className="fab fa-twitter"
        ></i>
        &nbsp;&nbsp;
        <i
          style={{ fontSize: "26px", color: "saddlebrown" }}
          className="fab fa-instagram"
        ></i>
        &nbsp;&nbsp;
      </div>
      <div className={classes.f_sec3}>
        <h3>Contact Us</h3>
        <i className="fas  fa-map-marker-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;
        <label for=""> India </label>
        <br />
        <i className="fas fa-envelope"></i> &nbsp;&nbsp;{" "}
        <label for=""> contact@encomece.com </label>
        <br />
        <i className="fas fa-phone-alt"></i> &nbsp;
        <label for=""> +91 9755497568 </label>
      </div>
    </div>
  );
};

export default Footer;
