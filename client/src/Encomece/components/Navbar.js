import React, { useEffect, useState } from "react";
import $ from "jquery";
import BrandLogo from "../assets/Images/Index_img/logo_white700.png";
import "./Navbar.scss";

(function ($) {
  // Begin jQuery
  $(function () {
    // DOM ready
    // If a link has a dropdown, add sub menu toggle.
    $("nav ul li a:not(:only-child)").click(function (e) {
      $(this).siblings(".nav-dropdown").toggle();
      // Close one dropdown when selecting another
      $(".nav-dropdown").not($(this).siblings()).hide();
      e.stopPropagation();
    });
    // Clicking away from dropdown will remove the dropdown class
    $("html").click(function () {
      $(".nav-dropdown").hide();
    });
    // Toggle open and close nav styles on click
    $("#nav-toggle").click(function () {
      $("nav ul").slideToggle();
    });
    // Hamburger to X toggle
    $("#nav-toggle").on("click", function () {
      this.classList.toggle("active");
    });
  }); // end DOM ready
})($); // end jQuery

const Navbar1 = () => {
  const [active, setActive] = useState(true);
  const handleScroll = () => {
    if (window.pageYOffset > 2500) {
      setActive(false);
    } else {
      setActive(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <section className={`navigation ${!active ? "hide" : ""}`}>
      <div className="nav-container">
        <div className="brand">
          <a href="/">
            <img src={BrandLogo} alt="logo" width="160" />
          </a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Programs</a>
              <ul className="nav-dropdown">
                <li>
                  <a href="/startup_program">Startup Program</a>
                </li>
                <li>
                  <a href="/ve_program">Virtual Employee Program</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#!">Services</a>
              <ul className="nav-dropdown">
                <li>
                  <a href="#!">Marketing</a>
                </li>
                <li>
                  <a href="#!">Content Writing</a>
                </li>
                <li>
                  <a href="#!">Advertisement</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/auth">Sign In</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Navbar1;
