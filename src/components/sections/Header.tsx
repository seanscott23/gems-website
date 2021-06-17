import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";
import "../../styles/Header.css";
import { getUserGems } from "../../store/actions/gemSubmitAction";

const Header: FC = () => {
  const { userGems } = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  const libraryHandler = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (userGems.length < 1) {
      dispatch(getUserGems());
    }

    history.push("/library");
  };

  const dashHandler = () => {
    history.push("/dashboard");
  };

  const profileHandler = () => {
    history.push("/profile");
  };

  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Navbar.Brand>
        <Link
          className="navbar-item"
          to={!authenticated ? "/" : "/dashboard"}
          onClick={() => localStorage.clear()}
        >
          Karats
        </Link>
      </Navbar.Brand>
      <NavDropdown title="Menu" id="nav-dropdown">
        {!authenticated ? (
          <div className="loggedOut-buttons">
            <NavDropdown.Item eventKey="4.1">
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
            <NavDropdown.Item eventKey="4.2">
              <Button onClick={() => history.push("/contact")}>Contact</Button>
            </NavDropdown.Item>
          </div>
        ) : (
          <div className="loggedIn-buttons">
            <NavDropdown.Item eventKey="4.1">
              <Button variant="primary" onClick={() => dashHandler()}>
                Upload Gem
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Button variant="primary" onClick={(e) => libraryHandler(e)}>
                Library
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.3">
              <Button variant="primary" onClick={() => profileHandler()}>
                Profile
              </Button>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey="4.4">
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
