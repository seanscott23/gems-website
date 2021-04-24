import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";
import "../../styles/Header.css";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  // const handleScroll = () => {
  //   const nav = document.getElementById("navbar");
  //   const navItem = document.getElementsByClassName("navbar-item");
  //   const navScroll = document.getElementsByClassName("navbar-collapse");
  //   const navHeight = nav?.offsetHeight;
  //   let topDistance = Math.abs(document.body.getBoundingClientRect().top);
  //   if (navHeight) {
  //     if (topDistance >= navHeight) {
  //       navItem[0].classList.add("sticky");
  //       nav?.classList.add("sticky");
  //       navScroll[0].classList.add("sticky");
  //     } else {
  //       navItem[0].classList.remove("sticky");
  //       nav?.classList.remove("sticky");
  //       navScroll[0].classList.remove("sticky");
  //     }
  //   }
  // };
  // window.addEventListener("scroll", handleScroll);
  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Navbar.Brand>
        <Link className="navbar-item" to={!authenticated ? "/" : "/dashboard"}>
          Gems
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto navupdate">
          {!authenticated ? (
            <div className="loggedOut-buttons">
              <Button
                onClick={() => history.push("/signup")}
                className="is-primary"
              >
                Sign up
              </Button>
              <Button onClick={() => history.push("/signin")}>Sign in</Button>
            </div>
          ) : (
            <div className="loggedIn-buttons">
              <Button
                variant="primary"
                onClick={() => history.push("/dashboard")}
              >
                Upload Gem
              </Button>
              <Button
                variant="primary"
                onClick={() => history.push("/library")}
              >
                Library
              </Button>
              <Button variant="secondary" onClick={logoutClickHandler}>
                Sign out
              </Button>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
