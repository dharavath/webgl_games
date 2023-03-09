import React, { useState } from "react";
import axios from "axios";
import logo from "../images/login-logo.png";
import bbgamelogin from "../../src/images/bbgamelogin.png";
import gamelogin from "../../src/images/gamelogin.png";
import booboocoin from "../../src/images/booboocoin.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGNIN } from "../actiontypes/Types";
import Signin, { UsersignIn } from "../actions/Signin";
const Login = () => {
  const [details, setdetails] = useState({});
  const [errMsg, seterrMsg] = useState("");
  const BaseURL = "https://booboo-login.kryptofam.com/";
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleChange = (evt) => {
    const value = evt.target.value;
    setdetails({
      ...details,
      [evt.target.name]: value,
    });
  };

  const Submit = async (e) => {
    try {
      let data = {
        id: details.email,
        password: details.password,
      };
      dispatch(UsersignIn(data)).then((respnse) => {
        console.log(respnse);
        if (respnse.code === "success") {
          sessionStorage.setItem("token", respnse.data.token);
          navigate("/home");
        } else {
          seterrMsg(respnse.data.message);
          console.log(respnse.data.message);
        }
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
      seterrMsg(error?.response?.data?.message);
    }
  };
  const gotosign = () => {
    // console.log()
    navigate("/signup");
  };
  return (
    <div className="fix-height relative">
      {/* sm:py-8 md:py-8 py-8 lg:py-8 xl:py-10 */}
      <div className="container mx-auto login-align login-page">
        <div className="w-full flex flex-col xl: flex-row md:flex-row sm:flex-col justify-between">
          <div className="xl:flex-row flex md:flex-row sm:flex-col flex-col lg:w-2/5 sm:w-4/5 md:w-2/5 p-6 sm:p-8 md:p-8 mx-auto sm:mx-auto md:mx-0 lg:mx-0 ">
            <div className="flex flex-col">
              <div className=" self-center px-20">
                <img
                  src={logo}
                  height="200"
                  width="200"
                  className="mx-auto"
                  alt=""
                />{" "}
              </div>
              {/* <img src={gamelogin} height="200" width="200" className="mx-auto" alt="" />  */}

              <div className="text-2xl text-red-500  mt-2 font-bold self-center mb-5">
                WELCOME TO BOOBOO GAMES
              </div>
              <div>
                <span className="after:content-[''] after:ml-0.5 text-justify text-red-700 red text-xs font-medium text-red text-left">
                  {errMsg}
                </span>
              </div>
              <label className="block w-full mb-5 mt-5 self-center">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 p-1 py-4 bg-transparent border-red-500 border-b-2 
                                     font-semibold focus:outline-none text-md placeholder-black"
                  //    focus:border-red-500 focus:ring-red-500 block signup-input-width
                  placeholder="Username"
                />{" "}
              </label>

              <label className="block w-full mb-5 self-center">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="mt-1 w-full px-3 p-1 py-4 bg-transparent border-red-500 border-b-2 
                                    placeholder-black font-semibold focus:outline-none text-md"
                  placeholder="Password"
                />
              </label>
              <div className="text-md flex text-right justify-end self-end font-semibold float-right">
                Forgot Password?
              </div>

              <div className="mb-2 w-full mt-5 self-center lg:self-center">
                <button
                  type="button"
                  onClick={Submit}
                  className="text-white w-full rounded-lg bg-red-500 text-xl font-bold signup-input-width py-2"
                >
                  {" "}
                  LOGIN
                </button>{" "}
              </div>

              {/* <button
                type="button"
                className="text-red-500 border-2 border-red-500 self-center text-center justify-center flex flex-row w-full rounded-lg bg-transparent text-xl font-bold signup-input-width py-2"
              >
                <img
                  src={booboocoin}
                  height="30"
                  width="30"
                  className="mr-2 self-center"
                  alt=""
                />{" "}
                <span className="flex self-center">Login with BooBoo</span>
              </button> */}

              <div className="text-xs font-normal">
                Don't have account ?
                <span
                  className="text-xs font-normal hover:border-b-2 hover:border-blue-500 hover:text-blue-500 cursor-pointer"
                  onClick={gotosign}
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>

          <div
            className="signup-background flex self-center "
            //    style={{backgroundImage: `url(${gamelogin})`}}
          >
            <img
              src={bbgamelogin}
              height="400"
              width="400"
              className="mx-auto"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
