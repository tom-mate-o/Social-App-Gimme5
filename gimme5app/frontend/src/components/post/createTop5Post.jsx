import React from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";

//Styled Components
import { Post } from "../../styled/posts/post";
import { SocialBar } from "../../styled/posts/socialBar";

// ...
 
export default function CreateTop5Post({top5posts}) {
 
        console.log(top5posts);
    return (
        
      <div>
        {top5posts.map((post, index) => (
            <Post key={index}>
                <PostInfoComponent user={post.user}/>
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
 