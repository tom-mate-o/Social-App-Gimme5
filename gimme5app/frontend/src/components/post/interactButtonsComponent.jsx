import React, { useEffect } from "react";
import { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BiStar, BiSolidStar } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import axios from "axios";
import showNotification from "../showNotifications/showNotifications";
import { getUserDataFromDatabase } from "../../utils/getUserDataFromDatabase";

// Styled Components
import { InteractButtons } from "../../styled/posts/interactButtons";
import BasicModal from "../comments/commentsModal";



export default function InteractButtonsComponent({ likes: initalLikes, id, topFivePosts, setTopFivePosts}) {


  const [likes, setLikes] = useState(initalLikes);
  const [userDatabase, setUserDatabase] = useState(null);
  const [likeClicked, setLikeClicked] = useState(false); // Variable die checkt ob like geklickt wurde
  const [likeRemoved, setLikeRemoved] = useState(false); // Variable die checkt ob like entfernt wurde



  // User Data wird geladen um breits gelikte Posts grün anzuzeigen
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const response = await axios.get("http://localhost:8080/getuserdata", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
        const user = response.data.data.find((user) => user.username === username);
        setUserDatabase(user);
      } catch (error) {
        console.log("Error fetching user data: ", error);
      }
    }
    fetchUserData();
  }, []);

  const userHasLikedPost = (id) => {
    if (userDatabase && userDatabase.likedPostsIds) {
      return userDatabase.likedPostsIds.includes(id);
    }
    return false;
  };


    const addLike = async (e, id) => {
        e.preventDefault();
        setLikeClicked(true);
      
        try {
          const token = localStorage.getItem("token");
      
          const config = {
            url: `http://localhost:8080/api/${id}/likepost`,
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios(config);

          if (response.status === 200) {
            setLikes(likes + 1);
            showNotification("Like added! 💚", "");

          } if (response.status === 201) {
            setLikes(likes - 1);
            showNotification("Like removed! 💔", "");
            setLikeClicked(false);
            setLikeRemoved(true);

          }

          
        } catch (error) {
            console.log(error.response);
          console.log("Error adding like: ", error);
        }
      };

  return (
    <InteractButtons className="social-icons">
      <div className="stars" onClick={(e) => addLike(e, id)}>
      {/* wurde auf like glickt ODER 
      hat dieser user den post bereits geliket 
      UND ist likeRemoved false?
      DANN Zeige den star solid in green. Ansonsten leer */}
      {(likeClicked || userHasLikedPost(id) && !likeRemoved) ? <BiSolidStar style={{color: "#13C460"}}/> : <BiStar />}
        <p>{likes}</p>
      </div>
      <BasicModal topFivePosts={topFivePosts} setTopFivePosts={setTopFivePosts} likes={initalLikes} id={id}/>
      <BiPaperPlane />
      <BiBookmark />
    </InteractButtons>
  );
}
