import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import moment from "moment";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

const PostCard = ({ post, index }) => {
  console.log(post);
  const { heading, description, author, datePosted, comments } = post;

  return (
    <Card
      key={index}
      sx={{
        backgroundColor: "var(--black)",
        color: "var(--white)",
        mb: 2,
        border: "1px solid var(--white)",
        borderRadius: "10px",
        boxShadow: "0px 0px 5px 0px var(--darkgrey)",
        padding: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {heading}
          <Typography variant="body2">
            {moment(datePosted).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
          <Typography variant="body2">
            - {author?.firstName}
          </Typography>
        </Typography>
        <Typography variant="body1" >
          {description?.length > 30
            ? description?.slice(0, 30) + "....."
            : description}
        </Typography>
      </CardContent>
      <div>
        <div>
          <Box display={"flex"} gap={2}>
            <BiSolidMessageSquareDetail />
            <Typography variant="body2">
              {comments.length} comments
            </Typography>
          </Box>
        </div>
        <div>
          <Button size="small" variant="contained" sx={{ marginTop: "5px" }}>
            Read More
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;
