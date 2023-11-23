import React, { useEffect, useState } from "react";
import { getUserDataFromDatabase } from "../../utils/getUserDataFromDatabase";

import { findAvatarUrl } from "../../utils/findAvatarUrlOfUser";
import { FiMapPin } from "react-icons/fi";
import { FaSquare, FaMastodon, FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaSpotify} from "react-icons/fa6";


// Styled Components
import { ProfileInfo } from "../../styled/posts/profileInfo";

export default function ProfileInfoComponent({user}) {
const [profileUserData, setProfileUserData] = useState([]);
const currentUserData = profileUserData.find((data) => data.username === user);

useEffect(() => {
    getUserDataFromDatabase(setProfileUserData);
}, []);
    console.log("useer in profileInfoComponent: ", user);

    const userData = profileUserData;

useEffect(() => {
    findAvatarUrl(user, profileUserData);
}, []);
console.log("profileUserData: ", profileUserData);

    return (
      <ProfileInfo>
        <div>{user && <img src={findAvatarUrl(user, userData)} className="profileavatar" alt={user} />}</div>
        <div className="userInfo">
        <h3>{user}</h3>
        {profileUserData.length > 0 && (
          <>
            <p>
              {currentUserData.firstname} {currentUserData.lastname}
            </p>
            <p><FiMapPin /> {currentUserData.location}</p>
            
          <div className="socialMediaIcons">
            {currentUserData.bluesky && (
              <a
                href={currentUserData.bluesky}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSquare />
              </a>
            )}

            {currentUserData.mastodon && (
              <a
                href={currentUserData.mastodon}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMastodon />
              </a>
            )}

            {currentUserData.youtube && (
              <a
                href={currentUserData.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            )}

            {currentUserData.facebook && (
              <a
                href={currentUserData.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
            )}

            {currentUserData.instagram && (
              <a
                href={currentUserData.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            )}

            {currentUserData.tiktok && (
              <a
                href={currentUserData.tiktok}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok />
              </a>
            )}

            {currentUserData.spotify && (
              <a
                href={currentUserData.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaSpotify />
              </a>
            )}
            </div>
            
          </>
        )}
        
        </div>
      </ProfileInfo>
    );
    }