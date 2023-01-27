import React, { useState } from "react";
import "../styles/Login.css";
import { LoginProps } from "../Interfaces";
import { useAuth0, PopupLoginOptions } from "@auth0/auth0-react";
import logo from "../assets/logo.png";

const Login: React.FC<LoginProps> = ({
  username,
  setUsername,
  password,
  setPassword,
}) => {
  //display password state
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //handle errors state
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<
    string | null
  >("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >("");

  //handle submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      setUsernameErrorMessage("Field is Required");
      setPasswordErrorMessage("Field is Required");
    } else if (password.length < 5 || password.length > 20) {
      setPasswordErrorMessage("Password must be 5-20 characters long.");
    } else {
      console.log("Form submitted with the following data:", {
        username,
        password,
      });
    }
    setUsername("");
    setPassword("");
  };

  //Show or Hide Password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //handling keyboard usage
  const handleKeyPress = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  //authentication
  const { loginWithPopup, isAuthenticated, logout } = useAuth0();

  //google
  const handleGoogleLogin = async () => {
    await loginWithPopup({
      connection: "google",
    } as PopupLoginOptions);
  };

  //microsoft
  const handleMicrosoftLogin = async () => {
    await loginWithPopup({
      connection: "microsoft",
    } as PopupLoginOptions);
  };

  //github
  const handleGitHubLogin = async () => {
    await loginWithPopup({
      connection: "github",
    } as PopupLoginOptions);
  };

  return (
    <div className="form-container">
      <div className="form-body">
        <img className="form__image" src={logo} alt="Zetificon logo" />
        <h1 className="form__title">Management Center</h1>

        {!isAuthenticated && (
          <form onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <input
              type="text"
              name="username"
              placeholder="Username *"
              value={username}
              onFocus={() => setUsernameErrorMessage(null)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(event.target.value)
              }
            />
            <span className="form__error__message">{usernameErrorMessage}</span>

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password *"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                onFocus={() => setPasswordErrorMessage(null)}
              />

              <svg
                className="form__icon"
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M11.83,9L15,12.16C15,12.11 15,12.05 15,12A3,3 0 0,0 12,9C11.94,9 11.89,9 11.83,9M7.53,9.8L9.08,11.35C9.03,11.56 9,11.77 9,12A3,3 0 0,0 12,15C12.22,15 12.44,14.97 12.65,14.92L14.2,16.47C13.53,16.8 12.79,17 12,17A5,5 0 0,1 7,12C7,11.21 7.2,10.47 7.53,9.8M2,4.27L4.28,6.55L4.73,7C3.08,8.3 1.78,10 1,12C2.73,16.39 7,19.5 12,19.5C13.55,19.5 15.03,19.2 16.38,18.66L16.81,19.08L19.73,22L21,20.73L3.27,3M12,7A5,5 0 0,1 17,12C17,12.64 16.87,13.26 16.64,13.82L19.57,16.75C21.07,15.5 22.27,13.86 23,12C21.27,7.61 17,4.5 12,4.5C10.6,4.5 9.26,4.75 8,5.2L10.17,7.35C10.74,7.13 11.35,7 12,7Z" />
              </svg>
              <span className="form__error__message">
                {passwordErrorMessage}
              </span>
            </div>

            <button className="btn"> Login </button>

            <button className="form__social__login" onClick={handleGoogleLogin}>
              Login with Google
            </button>
            <button
              className="form__social__login"
              onClick={handleMicrosoftLogin}
            >
              Login with Microsoft
            </button>
            <button className="form__social__login" onClick={handleGitHubLogin}>
              Login with GitHub
            </button>
          </form>
        )}
        {isAuthenticated && (
          <div className="success">
            <span className="success__title">Login Successful</span>
            <button
              className="logout"
              onClick={() =>
                logout({ logoutParams: { returnTo: "http://localhost:3000/" } })
              }
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
