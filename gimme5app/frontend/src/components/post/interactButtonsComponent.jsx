import React from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";


// Styled Components
import { InteractButtons } from "../../styled/posts/interactButtons";


export default function InteractButtonsComponent({ likes }) {
    return (
        <InteractButtons className="social-icons">
            <div className="stars"><BiStar /><p>{likes}</p></div>
            <BiPaperPlane />
            <BiBookmark />
        </InteractButtons>
    );
}