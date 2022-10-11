import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <i className="fa fa-mobile text-info" /> Contact{" "}
            <span className="text-info">List</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
