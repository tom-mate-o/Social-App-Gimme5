import React from "react";
import CreateTop5Post from "../post/createTop5Post";
import { PostContainer } from "../../styled/posts/postContainer";
import useMondoDBData from "../customHooks/useMondoDBData";

const Feed = () => {
  const [topFivePosts, setTopFivePosts] = useMondoDBData();

  return (
    <div>
      <PostContainer>
        <CreateTop5Post topFivePosts={topFivePosts}/>
      </PostContainer>
    </div>
  );
}

export default Feed;