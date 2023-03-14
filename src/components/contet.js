import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import profile from "../images/profile.png";

import uparrow from "../images/uparrow.png";
import { Accordion } from "react-bootstrap-accordion";
import Iframe from "react-iframe";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { COMMENTS } from "../actiontypes/Types";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Content = ({ id }) => {
  const [gamecomments, setgamecomments] = useState([]);
  const [info, setinfo] = useState([]);
  const [isClick, setClick] = useState(false);
  const [comment, setcomment] = useState("");
  const params = useParams("");
  console.log("asdfds", params);
  let dispatch = useDispatch();
  let userdata = useSelector((state) => {
    console.log("home token", state);
    return state?.userToken?.state ? state?.userToken?.state : state?.userToken;
  });

  let token = sessionStorage.getItem("token");

  const savecomment = async () => {
    setcomment("");
    try {
      console.log(comment);
      let data = {
        comment: comment,
      };
      await axios({
        method: "post",
        url: `https://html-game-api.kryptofam.com/add_comments?id=${params.id}`,
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
        data: data,
      }).then((res) => {
        console.log("comment added", res);
        if (res?.data?.code === 200) {
          setgamecomments(res?.data?.data?.comments);
        }
      });
    } catch (err) {
      console.log("ertr", err);
      setcomment("");
    }
  };

  const fetchgamedetails = async () => {
    try {
      await axios({
        method: "get",
        url: "https://html-game-api.kryptofam.com/game",
        headers: {
          Authorization: `Bearer ${userdata.token}`,
        },
        params: params,
      }).then((res) => {
        console.log("comments deta", res);
        setinfo(res?.data?.data);
        setgamecomments(res?.data?.data?.comments);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const handleChange = (event) => {
  //   console.log(event.target.checked);
  // };

  const handleChange = async (event) => {
    console.log("like ", event.target.checked);
    try {
      if (event.target.checked) {
        let data = {
          comment: params.id,
        };
        await axios({
          method: "post",
          url: "https://html-game-api.kryptofam.com/add_favorite_game",
          headers: {
            Authorization: `Bearer ${userdata.token}`,
          },
          data: data,
        }).then((res) => {
          console.log("comment added", res);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchgamedetails();
  }, []);

  return (
    <div className="flex flex-col">
      {/* <div className="flex text-red-500 text-lg float-left text-left  font-semibold py-5">
        <span className="border-b-2 border-red-500">More Information</span>
        <i class="fa fa-angle-down text-xl font-semibold self-center align-middle text-red-500"></i>
      </div> */}
      <div>
        <Accordion
          id="first"
          title="More Information"
          className="flex float-left text-left flex-col accordion-image first"
        >
          {/* onClick={getclick}  */}

          <div className="body-height close-accordion">
            <div>{info.description}</div>
            {/* <div> gfhsdg hfjsg fsjhg fjhdsg</div> */}
          </div>
        </Accordion>
        <div className="flex float-right">
          <div
            style={{
              margin: "auto",
              display: "block",
              width: "fit-content",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onChange={handleChange}
                  name="checkedH"
                />
              }
              label="Add to favorite games "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row self-center text-center py-5 align">
        <input
          type="text"
          name="search"
          value={comment}
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          className="header-search bg-red-200 
         b-2 px-3 p-4 h-full dark:focus:border-red-300 focus:ring-red-300 focus:border-red-300 border-0
      border-red-300 placeholder-white font-semibold focus:outline-none 
              xl:w-96 md:w-96 sm:w-60 w-40 block text-white  rounded-full sm:text-sm focus:ring"
          placeholder="Type Comments...."
        />

        <button
          type="button"
          onClick={savecomment}
          className="bg-red-500 w-60 text-white font-semibold -ml-20 px-12 text-xs rounded-full "
        >
          Send Comment
        </button>
      </div>
      <div className="flex w-full flex-col h-96 overflow-y-auto scroll">
        {gamecomments
          .slice()
          .reverse()
          .map((comment) => {
            return (
              <div
                className="flex flex-col py-3 text-left float-left"
                key={comment._id}
              >
                <div className="flex flex-row w-full">
                  <img
                    // src={profile}
                    src={`https://ui-avatars.com/api/?bold=true&name=${comment.username}`}
                    height="40"
                    width="40"
                    className="mr-2 self-center rounded-full"
                    alt=""
                  />
                  <span className="flex self-center text-sm font-normal">
                    {comment.username}
                  </span>
                </div>
                <div>{comment.text}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Content;
