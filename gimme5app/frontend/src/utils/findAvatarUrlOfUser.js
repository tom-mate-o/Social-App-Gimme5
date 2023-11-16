import React from "react";


export const findAvatarUrl = (username, userData) => {
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].username.toLowerCase() === username.toLowerCase()) {
      return userData[i].avatarUrl;
    }
  }
  console.log('User not found');
  return null;
}
