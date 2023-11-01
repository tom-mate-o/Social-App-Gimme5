import React from "react";


// Styled Components
import { PostTitle } from "../../styled/posts/postTitle";

export default function PostTitleComponent({title}) {
    return (
        <PostTitle>
        <p>Top 5 {title}</p>
        </PostTitle>
    );
    }