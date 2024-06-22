import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import axios from "axios";
import { Box, Button, Grid } from "@mui/material";
import PostCard from "../components/PostCard";

const Discussions = () => {
  const [allPosts, setAllPosts] = useState([]);
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/discussions`, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setAllPosts(response?.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  useEffect(() => {
    fetchAllPosts();
  }, []);

  console.log(allPosts);
  return (
    <div>
      <Header />
      <Box
        component="main"
        className="root"
        width={"100%"}
        sx={{ backgroundColor: "var(--black)", height: "calc(100vh - 93px)" }}
      >
        <h1 style={{ color: "var(--white)", textAlign: "center" }}>
          Discussions
        </h1>
        {allPosts?.length > 0 ? (
          <Grid container gap={5} justifyContent={"space-evenly"}>
            {allPosts?.map((post, index) => {
              return (
                <Grid xs={1} md={3} lg={3} justifySelf={"start"}>
                  <PostCard post={post} index={index} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Sorry, No Items In The Watchlist.
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
              }}
            >
              <a href="/dashboard">
                <Button text="Dashboard" />
              </a>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Discussions;
