import React from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";
import PostCategoryComponent from "./postCategoryComponent";

//Styled Components
import { Post } from "../../styled/posts/post";
import { SocialBar } from "../../styled/posts/socialBar";

// ...
 
export default function CreateTop5Post({topFivePosts}) {
 
        console.log(topFivePosts);
    return (
        
      <div>
        {topFivePosts.slice().reverse().map((post, index) => (
            <Post key={index}>
                <PostInfoComponent user={post.user}/>
                <PostCategoryComponent category={post.category}/>
                <PostTitleComponent title={post.subcategory}/>
                <FiveListComponent list={post.list}/>
                <SocialBar>
                        <HashtagCloudComponent hashtags={post.hashtags}/>
                        <InteractButtonsComponent likes={post.likes}/>
                </SocialBar>
            </Post>
        ))}
  

      </div>
    );
  }
 