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
  //   const navMenu = document.getElementsByClassName("navbar-toggler");
  //   const navScroll = document.getElementsByClassName("navbar-collapse");
  //   const newNav = document.getElementById("newNav");
  //   const navHeight = nav?.offsetHeight;
  //   const newNavHeight = newNav?.offsetHeight;
  //   let topDistance = Math.abs(document.body.getBoundingClientRect().top);

  //   if (navHeight && topDistance >= navHeight) {
  //     navItem[0].classList.add("sticky");
  //     navMenu[0].classList.add("menu-button");
  //     nav?.setAttribute("id", "newNav");
  //     navScroll[0].classList.add("sticky");
  //   } else if (newNavHeight && topDistance < newNavHeight) {
  //     navItem[0].classList.remove("sticky");
  //     navMenu[0].classList.remove("menu-button");
  //     newNav?.setAttribute("id", "navbar");
  //     navScroll[0].classList.remove("sticky");
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
      <NavDropdown title="Menu" id="nav-dropdown">
        {!authenticated ? (
          <div className="loggedOut-buttons">
            <NavDropdown.Item eventKey="4.1">
              {" "}
              <Button
                onClick={() => history.push("/signup")}
                className="is-primary"
              >
                Sign up
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Button onClick={() => history.push("/signin")}>Sign in</Button>
            </NavDropdown.Item>
          </div>
        ) : (
          <div className="loggedIn-buttons">
            <NavDropdown.Item eventKey="4.1">
              <Button
                variant="primary"
                onClick={() => history.push("/dashboard")}
              >
                Upload Gem
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Button
                variant="primary"
                onClick={() => history.push("/library")}
              >
                Library
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.3">
              <Button variant="secondary" onClick={logoutClickHandler}>
                Sign out
              </Button>
            </NavDropdown.Item>
          </div>
        )}
      </NavDropdown>
    </Navbar>
  );
};

export default Header;
