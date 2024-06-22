import { Box, Button, CssBaseline } from "@mui/material";
import React, { useState } from "react";
import novGif from "../assets/nov.gif";
import Header from "../components/Common/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const PostCreate = () => {
  const [formData, SetFormData] = useState({
    heading: "",
    description: "",
  });

  const navigate = useNavigate();

  const { heading, description } = formData;

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/post",
        {
          heading: heading,
          description: description,
        },
        {
          withCredentials: true, // Send cookies with the request
        }
      )
      .then((response) => {
        console.log(response.data); // Handle success
        SetFormData({
          heading: "",
          description: "",
        });
        toast.success(response.data);
        setTimeout(() => {
          navigate("/discussions");
        }, 2000);
      })
      .catch((error) => {
        console.error(error); // Handle error
      });
  };
  return (
    <div>
      <Header />
      <Box
        component="main"
        className="root"
        display={"flex"}
        width={"100%"}
        justifyContent={"space-evenly"}
        sx={{ backgroundColor: "var(--black)", height: "calc(100vh - 93px)" }}
      >
        <CssBaseline />
        <Box
          display={"flex"}
          style={{
            backgroundRepeat: "no-repeat",
            backgroundColor: "var(--black)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          justifyContent={"center"}
        >
          <img
            className="postsImg"
            src={novGif}
            alt=""
            style={{ width: "90%", margin: "auto", borderRadius: "1rem" }}
          />
        </Box>
        <Box>
          <div
            style={{ padding: "10px 20px", backgroundColor: "var(--black)" }}
          >
            {/* <Avatar className={classes.avatar}>
              <NoteAddIcon />
            </Avatar> */}
            <h1 component="h1" variant="h5" style={{ color: "var(--white)" }}>
              Create Post
            </h1>
            <form onSubmit={(e) => onSubmit(e)} noValidate>
              <input
                className="search-input"
                placeholder="Heading"
                required
                id="Heading"
                name="heading"
                value={formData?.heading}
                onChange={(e) => onChange(e)}
                style={{
                  backgroundColor: "var(--darkgrey)",
                  color: "var(--grey)",
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  border: "none",
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "5px",
                  ":focus": {
                    outline: "none",
                  },
                }}
              />

              <textarea
                className="search-input"
                placeholder="Description"
                required
                id="Description"
                name="description"
                value={formData?.description}
                onChange={(e) => onChange(e)}
                rows={10}
                style={{
                  backgroundColor: "var(--darkgrey)",
                  color: "var(--grey)",
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  border: "none",
                  width: "100%",
                  padding: "1rem",
                  margin: "1rem 0",
                  borderRadius: "5px",
                  ":focus": {
                    outline: "none",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  color: "var(--darkgrey)",
                }}
              >
                Create Post
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default PostCreate;
