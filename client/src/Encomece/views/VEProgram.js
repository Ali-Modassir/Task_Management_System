import React from "react";

//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//css
import classes from "../assets/css/layout.module.css";

//Images
import Image1 from "../assets/Images/VE_img/Group 268.png";
import Image2 from "../assets/Images/VE_img/Mask Group 21.png";
import Image3 from "../assets/Images/VE_img/avatar-circle-human-male-4-512 (1).png";

const VEProgram = () => {
  return (
    <>
      <div className={classes.vp_Sec1}>
        <Navbar />
        <div className={classes.header}>
          <div className={classes.header_sec1}>
            <h1>
              Virtual <span id={classes.emp}> Employee </span> Program
            </h1>
            <h2>Are You a New Startup?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              nesciunt ex reiciendis quos doloremque, beatae excepturi omnis
              eveniet quasi corrupti id! Labore quisquam porro possimus.
            </p>
            <button id={classes.button}>Register</button>
          </div>
          <div className={classes.header_sec2}>
            <img src={Image1} width="100%" alt="Image1" />
          </div>
        </div>
      </div>
      <div className={classes.vp_Sec2}>
        <div className={classes.vp_sec2p1}>
          <img src={Image2} alt="Image2" />
        </div>
        <div className={classes.vp_sec2p2}>
          <h2>Hire Virtual Employee</h2>
          <p>
            Hire our employees to get your work done. Our task experts will work
            as virtual employee for you to drive your business towards success.
          </p>

          <h2>List The Micro Tasks</h2>
          <p>
            List your work when you want us to do for you. we take the
            responsibility for all your micro tasks.
          </p>

          <h2>Assign The Tasks</h2>
          <p>
            Pick the best virtual employee to assign the particular task to
            them.
          </p>

          <h2>Get Your Tasks Done</h2>
          <p>Track your task progress and get your work done efficiently.</p>

          <h2>Pay Per Micro Tasks</h2>
          <p>
            Paying full salary but having limited work? Pay our employees just
            for the task they've completed for.
          </p>
        </div>
      </div>
      <div className={classes.vp_Sec3}>
        <div className={classes.vp_Sec3p1}>
          <h1>Over View</h1>
          <button>
            virtual <span id={classes.emp}>employee</span>
          </button>
        </div>
        <div className={classes.vp_Sec3p2}>
          <div className={classes.vpcards}>
            <div className={classes.cardsec1}>
              <div className={classes.cardimg}>
                <img src={Image3} alt="Image3" />
              </div>
              <div className={classes.cardtxt}>
                <h2>Founder & CEO</h2>
                <h1>Liam Noah</h1>
              </div>
            </div>
            <div className={classes.cardsec2}>
              <h2>CEO Approval Rating</h2>
              <h2>--/100</h2>
              <span id={classes.emp}>
                <h2>Weigh in</h2>
              </span>
            </div>
          </div>

          <div className={classes.vpcards} id={classes.two}>
            <div className={classes.cardsec1}>
              <div className={classes.cardimg}>
                <img src={Image3} alt="Image3" />
              </div>
              <div className={classes.cardtxt}>
                <h2>Founder & CEO</h2>
                <h1>Liam Noah</h1>
              </div>
            </div>
            <div className={classes.cardsec2}>
              <h2>CEO Approval Rating</h2>
              <h2>--/100</h2>
              <span id={classes.emp}>
                <h2>Weigh in</h2>
              </span>
            </div>
          </div>

          <div className={classes.vpcards} id={classes.one}>
            <div className={classes.cardsec1}>
              <div className={classes.cardimg}>
                <img src={Image3} alt="" />
              </div>
              <div className={classes.cardtxt}>
                <h2>Founder & CEO</h2>
                <h1>Liam Noah</h1>
              </div>
            </div>
            <div className={classes.cardsec2}>
              <h2>CEO Approval Rating</h2>
              <h2>--/100</h2>
              <span id={classes.emp}>
                <h2>Weigh in</h2>
              </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default VEProgram;
