import React, { Component } from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";

//Styled Components
import { PostContainer } from "../../styled/posts/postContainer";
import { Post } from "../../styled/posts/post";
import { SocialBar } from "../../styled/posts/socialBar";

 
export default class Feed extends Component {
  render() {
    return (
      <div>

    <PostContainer>
        <Post>
            <PostInfoComponent/>
            <PostTitleComponent/>
            <FiveListComponent/>
            <SocialBar>
                    <HashtagCloudComponent/>
                    <InteractButtonsComponent/>
            </SocialBar>
        </Post>
    </PostContainer>

      </div>
    );
  }
}
 