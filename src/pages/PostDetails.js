import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Box,
} from '@mui/material';
import { endpoint } from '../services';
import Header from '../components/Common/Header';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false); 

  console.log(postId)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${endpoint}/discussionsById/${postId}`, {
            withCredentials: true, 
        });
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId, refresh]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${endpoint}/addComment`, { postId: postId, text: commentText }, {
        withCredentials: true
      });
      setComments([...comments, response.data]);
      setCommentText('');
      setRefresh((prev) => !prev); 
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ paddingY: 4 }}> 
        <Grid container spacing={3}> 
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'var(--black)' }}>
              <Typography variant="h4" align="left" fontWeight={800} color={'var(--grey)'}>{post?.heading}</Typography>
              <Typography variant="body1" fontWeight={600}>{post?.description}</Typography>
              <Typography variant="subtitle2" align="right">By: {post?.author?.firstName} {post?.author?.lastName}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, backgroundColor: 'var(--black)' }}>
              <Typography variant="h5" align="left">Comments</Typography>
              <List>
                {comments?.map((comment, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar>{comment?.author?.firstName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${comment?.author?.firstName} ${comment?.author?.lastName}`}
                      secondary={comment?.text}
                      secondaryTypographyProps={{color: 'var(--black'}}
                    />
                  </ListItem>
                ))}
              </List>
              <textarea
                className="search-input"
                placeholder="Add a comment"
                required
                id="Comment"
                name="comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={10}
                style={{
                  backgroundColor: "var(--darkgrey)",
                  color: "var(--grey)",
                  fontFamily: "Inter",
                  fontSize: "1rem",
                  border: "none",
                  width: "90%",
                  padding: "1rem",
                  margin: "1rem 0",
                  borderRadius: "5px",
                  ":focus": {
                    outline: "none",
                  },
                }}
              />
              <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}> 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;