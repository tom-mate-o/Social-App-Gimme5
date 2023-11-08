import React from "react";


// Styled Components
import { PostTitle } from "../../styled/posts/postTitle";

export default function PostCategoryComponent({category}) {
    return (
        <PostTitle>
        <p>Category: {category}</p>
        </PostTitle>
    );
    }