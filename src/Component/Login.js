import React, { useState } from "react";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth, provider } from "../firebase";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    signIn: true,
    showPassword: false,
  });
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const onchangeHandler = (e, type) => {
    setError("");
    setValues({ ...values, [type]: e.target.value });
  };

  const signInHandler = () => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => props.history.push("/"))
      .catch((error) => setError(error.message));

    setValues({ ...values, password: "", email: "" });
  };

  const SignUpHandler = () => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(props.history.push("/"))
      .catch((error) => setError(error.message));
    setValues({ ...values, password: "", email: "" });
  };

  const changeLoginTypeHandler = () => {
    setValues({ ...values, signIn: !values.signIn });
  };

  const loginWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(() => props.history.push("/"))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="login">
      <div className="loginpage_conatainer">
        <div>
          <AccountCircleIcon className="login_img" />
        </div>
        <div>
          <TextField
            style={{ color: "white" }}
            className="outlined-basic"
            value={values.email}
            type="email"
            label="Email"
            variant="filled"
            onChange={(e) => onchangeHandler(e, "email")}
          />
        </div>
        <div className="mt-2 ml-0">
          <FormControl style={{ width: "100%" }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              // style={{ color: "white" }}
              className="outlined-basic"
              id="filled-adornment-password"
              value={values.password}
              onChange={(e) => onchangeHandler(e, "password")}
              type={values.showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <span style={{ color: "#dc3545", fontSize: "10px" }}>{error}</span>
        <div className="login_button ">
          <button
            className="btn btn-primary"
            onClick={values.signIn ? signInHandler : SignUpHandler}
          >
            {values.signIn ? "Sign In" : "Sign Up"}
          </button>
          <h6 className="login_option">
            <span className="px-2">or</span>
          </h6>
          <button className="btn btn-outline-danger" onClick={loginWithGoogle}>
            <img
              style={{ wifth: "20px", height: "20px", marginRight: "10px" }}
              src="https://img.icons8.com/fluent/2x/google-logo.png"
              alt=""
            />
            <strong>Login with Google</strong>
          </button>
        </div>
        <div className="login_type">
          <p style={{ fontSize: "15px", color: "white" }}>
            {values.signIn
              ? "Don't have a account? "
              : "Already have an account? "}
            <span
              style={{ color: "lightgrey" }}
              onClick={changeLoginTypeHandler}
            >
              {values.signIn ? "Sign Up" : "Sign In "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
