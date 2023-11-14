import React from "react";
import CreateTop5Post from "../post/createTop5Post";
import { PostContainer } from "../../styled/posts/postContainer";
import useMondoDBData from "../customHooks/useMondoDBData";

const Feed = ({handleLogout}) => {
  const [topFivePosts] = useMondoDBData();

  return (
    <div>
      <PostContainer>
        <CreateTop5Post topFivePosts={topFivePosts}  handleLogout={handleLogout}/>
      </PostContainer>
    </div>
  );
}

export default Feed;