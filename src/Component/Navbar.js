import React from "react";
import { Avatar } from "@material-ui/core";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import "./Navbar.scss";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import { selectNavbar } from "../features/navbarSlice";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Navbar(props) {
  const user = useSelector(selectUser);
  const shownavbar = useSelector(selectNavbar);

  const logOutHandler = () => {
    auth.signOut();
    props.history.push("/");
  };

  return (
    <div>
      {shownavbar ? (
        <div className="navbar1">
          <div
            className="navbar_left "
            style={{ textAlign: "left", color: "white" }}
          >
            <h2 className="m-0 pl-2">
              <strong>Kontext</strong>
            </h2>
          </div>
          <div className="navbar_right " style={{ textAlign: "right" }}>
            <div className="dropdown mr-2" style={{ textAlign: "right" }}>
              <div
                className="dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar alt="Profile" src={user.photo} />
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <span className="dropdown-item">{user.email}</span>
                <span className="dropdown-item">Invoice List</span>
                <span className="dropdown-item" onClick={() => logOutHandler()}>
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="Navbar"></div>
      )}
    </div>
  );
}

export default withRouter(Navbar);
