import React from "react";
import { useState, useRef } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import {DateTime} from "luxon";
import showNotification from "../showNotifications/showNotifications";
import axios from "axios";
import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/data/en.json';
import es from 'bad-words-next/data/es.json';
import fr from 'bad-words-next/data/fr.json';
import de from 'bad-words-next/data/de.json';
import ru from 'bad-words-next/data/ru.json';
import rl from 'bad-words-next/data/ru_lat.json';
import ua from 'bad-words-next/data/ua.json';
import pl from 'bad-words-next/data/pl.json';
import ch from 'bad-words-next/data/ch.json';
import DeleteTopFive from "../delete/deleteTopFive";
import { deleteCommentFromPost } from "../../utils/deleteCommentFromPost";
import {v4 as uuidv4} from "uuid";

import { CommentContainer } from "../../styled/comments/commentContainer";
import { CommentInput } from "../../styled/comments/commentInput";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height: "70%",
  maxHeight: "600px",
  maxWidth: 400,
  bgcolor: '#414141',
  borderRadius: '30px',
  boxShadow: 24,
  p: 4,
  fontFamily: 'sans-serif',
  color: 'white',
  overflowY: 'auto',
  
};

export default function BasicModal({likes, id, topFivePosts, setTopFivePosts, countComments, setCountComments}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [comment, setComment] = useState([]);
  const commentfield = useRef()

  const badwords = new BadWordsNext()
  badwords.add(en)
  badwords.add(es)
  badwords.add(fr)
  badwords.add(de)
  badwords.add(ru)
  badwords.add(rl)
  badwords.add(ua)
  badwords.add(pl)
  badwords.add(ch)

  const onDelete = async (id, commentId) => {
    const deleteCheck = async () => {
      const config = {
        method: "POST",
        url: `http://localhost:8080/api/checkuseroncomment`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          currentUsername: localStorage.getItem("username"),
          postId: id,
          commentId: commentId,
        },
      };

    try {
        const response = await axios(config);

        if (response.status === 200) {
        await deleteCommentFromPost(id, commentId);
        setTopFivePosts(prevPosts => {
          const newPosts = [...prevPosts];
          const post = newPosts.find(post => post.id === id);
          post.comments = post.comments.filter(comment => comment.commentId !== commentId);
          return newPosts;
        });
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification("You can only delete your own comments.", "error");
        console.log("Error deleting post: ", error);
    }
}
    };
    await deleteCheck();
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
        // comment abgreifen
  const comment = commentfield.current.value; // comment
  const user = localStorage.getItem("username"); // username
  const timestampcoded = DateTime.local(); // timestamp
  const commentId = uuidv4();
  const commentObject = {commentId, comment, user, timestamp: timestampcoded.toISO()};


  
    e.preventDefault();

    if (badwords.check(commentObject.comment)) {
      showNotification("No bad words allowed", "error");
      return;
    }
      


  // push commentObject to database
  const config = {
    url: "http://localhost:8080/api/addcomment",
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    data: {
      id: id,
      commentId,
      user: commentObject.user,
      timestamp: commentObject.timestamp,
      comment: commentObject.comment,
    }
  }

  const response = await axios(config);
  if (response.status === 201){
    setTopFivePosts(prevPosts => {
      const newPosts = [...prevPosts];
      const post = newPosts.find(post => post.id === id);
      post.comments.push(commentObject);
      return newPosts;

    });
    setComment(prevComments => [...prevComments, commentObject]);
  }





    commentfield.current.value = "";
    }


  return (
    <div className="commentModal">
      <div className="stars" onClick={handleOpen}>
        <HiOutlineChatBubbleOvalLeftEllipsis />
        <p>{topFivePosts.find(post => post.id === id).comments.length}</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            {topFivePosts.find(post => post.id === id).comments.slice().map((comment,index) => (
              <CommentContainer key={index}>
              <div >
                <h4>{comment.user}</h4>
                <p><i>{DateTime.fromISO(comment.timestamp).toRelative()}</i></p>
                <p>
                  {comment.comment}
                </p>
              <div className="commentdelete">
                {comment.user === localStorage.getItem("username") && (
                <DeleteTopFive onDelete={() => onDelete(id, comment.commentId)} />
                )}
                </div>
              </div>
              </CommentContainer>
            ))}
          
          <form onSubmit={handleSubmit}>
            <CommentInput>
              <input
                className="commentinput"
                type="text"
                ref={commentfield}
                name="commentfield"
                onChange={handleChange}
                placeholder="Add a comment..."
                required={true}
                minLength={4}
                maxLength={250}
                style={{width: "300px"}}
              />
            </CommentInput>
          </form>
        </Box>
      </Modal>
    </div>
  );
}