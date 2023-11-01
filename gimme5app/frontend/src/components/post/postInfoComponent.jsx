import React from "react";


// Styled Components
import { PostInfo } from "../../styled/posts/postInfo";

export default function PostInfoComponent({user}) {
    return (
        <PostInfo>
        <p>{user} posted</p>
        </PostInfo>
    );
    }