import React from "react";
//Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

//css
import classes from "../assets/css/layout.module.css";

//Images
import Image1 from "../assets/Images/SP_img/Group 270.png";
import Image2 from "../assets/Images/SP_img/Group 272.png";
import Image3 from "../assets/Images/SP_img/Group 273.png";
import Image4 from "../assets/Images/SP_img/Group 274.png";
import Image5 from "../assets/Images/SP_img/Group 275.png";
import Image6 from "../assets/Images/SP_img/Group 276.png";
import Image7 from "../assets/Images/SP_img/Mask Group 10.png";
import Image8 from "../assets/Images/SP_img/Group 271.png";
import Image9 from "../assets/Images/SP_img/document.png";
import Image10 from "../assets/Images/SP_img/cogwheels.png";
import Image11 from "../assets/Images/SP_img/website.png";

const StartupProgram = () => {
  return (
    <>
      <div className={classes.bgImg}>
        <Navbar />
        <div className={classes.text}>
          <div className={classes.tsec1}>
            <h1>Startup Program</h1>
            <h2>Having a startup idea?</h2>
            <p>
              So many startup ideas die because of no proper guidance and help.
              Ideas need to be nurtured. You provide us with the idea and we
              provide you with the plan and strategy. We help you reach a
              consensus regarding a decision. Our role isn’t just that of an
              advisor but that of a partner, a friend.
            </p>
          </div>
          <div className={classes.tsec2}>
            <img src={Image1} alt="Image1" />
          </div>
        </div>
      </div>
      <div className={classes.startup_c}>
        <div className={classes.startup_sec1}>
          <h1>Startup Consultation</h1>
          <br />
          <p>
            Starting a new business can be challenging and very confusing. Too
            many things we get to focus on and without any professional guidance
            it’s really difficult to manage. We are here to help and suggest you
            the best possible things to start with.
          </p>
        </div>
        <div className={classes.startup_sec2}>
          <div className={classes.startup_sec2pointone}>
            <div className={classes.box1}>
              <div className={classes.imgb1}>
                <img src={Image2} width="60%" alt="" />
              </div>
              <div className={classes.startup_text}>
                <h2>Research and </h2>
                <h2>Analysis</h2>
              </div>
            </div>
            <div className={classes.box2}>
              <div className={classes.imgb2}>
                <img src={Image3} width="64%" alt="" />
              </div>
              <div className={classes.startup_text}>
                <h2>Strategy and </h2>
                <h2>Planning</h2>
              </div>
            </div>
          </div>
          <div className={classes.startup_sec2pointtwo}>
            <div className={classes.box3}>
              <div className={classes.imgb3}>
                <img src={Image4} width="60%" alt="" />
              </div>
              <div className={classes.startup_text}>
                <h2>Structure and </h2>
                <h2>Prototyping</h2>
              </div>
            </div>
            <div className={classes.box4}>
              <div className={classes.imgb4}>
                <img src={Image5} width="47%" alt="" />
              </div>
              <div className={classes.startup_text}>
                <h2>Budget and </h2>
                <h2>Requirements</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.startup_soln}>
        <div className={classes.soln_image}>
          <img src={Image6} alt="" />
        </div>
        <div className={classes.soln_info}>
          <h1>Startup Solutions</h1>
          <br />
          <p>
            Encomece understands the need of business today. We do not just stop
            by playing an advisory role but we provide all the startup solutions
            for you to have a great start to your dream venture. We walk along
            with you in executing these strategies, to ensure your success.
          </p>
        </div>
      </div>
      <div className={classes.solutions}>
        <div className={classes.soln1}>
          <div className={classes.soln_img1}>
            <h2>
              Management <span className={classes.solnt}>Solutions</span>
            </h2>
          </div>
          <div className={classes.soln_text}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
              vel facilis dolores suscipit sint. Cupiditate aliquam voluptates
              necessitatibus laboriosam cumque illo a officia alias. Totam
              consequuntur numquam aliquid.
            </p>
          </div>
        </div>
        <div className={classes.soln2}>
          <div className={classes.soln_img2}>
            <h2 id={classes.MS}>
              Marketing <span className={classes.solnt}> Solutions</span>
            </h2>
          </div>
          <div className={classes.soln_text}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
              vel facilis dolores suscipit sint. Cupiditate aliquam voluptates
              necessitatibus laboriosam cumque illo a officia alias. Totam
              consequuntur numquam aliquid. Lorem ipsum dolor sit, amet
              consectetur.
            </p>
          </div>
        </div>
        <div className={classes.soln3}>
          <div className={classes.soln_img3}>
            <h2>
              Development <span id={classes.SOLN}>Solutions</span>
            </h2>
          </div>
          <div className={classes.soln_text}>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
              vel facilis dolores suscipit sint. Cupiditate aliquam voluptates
              necessitatibus laboriosam cumque illo a officia alias. Totam
              consequuntur numquam aliquid.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.contactus}>
        <div className={classes.contact_sec1}>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            repellat? Eaque, esse.
          </h1>
          <br />
          <button>Contact Us</button>
        </div>
        <div className={classes.contact_sec2}>
          <img src={Image7} alt="" />
        </div>
      </div>
      <div className={classes.PMS}>
        <div className={classes.PMS_sec1}>
          <div className={classes.PMS_text}>
            <h1>
              Project Management <br /> Support
            </h1>
            <br />
            <p>
              Starting a business can be really confusing that we should start
              from. We will help you with end-to-end project management support
              for hassle free work management. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Necessitatibus, facilis. Officiis
              dolores adipisci beatae enim perspiciatis voluptatum error maiores
              ad, eius voluptate. Officiis eaque laborum esse? Nisi harum sit
              voluptatibus.
            </p>
          </div>
          <div className={classes.PMS_img}>
            <img src={Image8} alt="Image8" />
          </div>
        </div>
        <div className={classes.PMS_sec2}>
          <div id={classes.cardone} className={classes.PMS_card}>
            <div className={classes.PMS_card_sec1}>
              <h2>Documentation</h2>
              <img src={Image9} alt="" />
            </div>
            <div className={classes.PMS_card_sec2}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                vel eveniet sint quidem ipsum expedita quisquam? Reprehenderit
                perferendis, animi saepe unde ex odit tempora vel praesentium.
                Pariatur!
              </p>
            </div>
          </div>
          <div className={classes.PMS_card}>
            <div className={classes.PMS_card_sec1}>
              <h2>Operations</h2>
              <img src={Image10} alt="" />
            </div>
            <div className={classes.PMS_card_sec2}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                vel eveniet sint quidem ipsum expedita quisquam? Reprehenderit
                perferendis, animi saepe unde ex odit tempora vel praesentium.
                Pariatur!
              </p>
            </div>
          </div>
          <div className={classes.PMS_card}>
            <div className={classes.PMS_card_sec1}>
              <h2>Resources</h2>
              <img src={Image11} alt="" />
            </div>
            <div className={classes.PMS_card_sec2}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                vel eveniet sint quidem ipsum expedita quisquam? Reprehenderit
                perferendis, animi saepe unde ex odit tempora vel praesentium.
                Pariatur!
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default StartupProgram;
