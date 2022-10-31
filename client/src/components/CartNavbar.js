import React from "react";
import "../styles/navbar.css";
import 'font-awesome/css/font-awesome.min.css';
const Navbar = ({ setShow, size }) => {
  return (
    <nav>
      <div className="nav_box">
        <span className="my_shop" onClick={() => setShow(true)}>
          My Shoping
        </span>
        <div className="cart" onClick={() => setShow(false)}>
          <span>
          <i class="fa fa-cart-plus" aria-hidden="true"></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
