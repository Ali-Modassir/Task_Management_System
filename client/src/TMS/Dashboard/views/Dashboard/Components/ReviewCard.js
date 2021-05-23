import React from "react";
import "../Dashboard.css";
import PersonalImg from "../../../assets/img/PersonImg.png";
import StarIcon from "@material-ui/icons/Star";

const ReviewCard = () => {
  return (
    <div className="dash-dashboard-reviewCard-container">
      <div className="dash-dashboard-reviewCard-heading">
        <span>Latest Reviews</span>
      </div>
      <div className="dash-dashboard-reviews">
        <div className="dash-dashboard--review">
          <div className="dash-dashboard-review-img">
            <img src={PersonalImg} alt="review-img" />
          </div>
          <div className="dash-dashboard-review-details">
            <div className="dash-dashboard-review-name">Lorem Ipsum</div>
            <div className="dash-dashboard-review-star">
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
            </div>
            <div className="dash-dashboard-review-message">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero
            </div>
          </div>
        </div>
        <div className="dash-dashboard--review second">
          <div className="dash-dashboard-review-img">
            <img src={PersonalImg} alt="review-img" />
          </div>
          <div className="dash-dashboard-review-details">
            <div className="dash-dashboard-review-name">
              <span>Lorem Ipsum</span>
            </div>
            <div className="dash-dashboard-review-star">
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
              <StarIcon className="dash-star" />
            </div>
            <div className="dash-dashboard-review-message">
              <span>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
