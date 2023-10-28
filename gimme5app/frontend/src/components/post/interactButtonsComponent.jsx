import React from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BiStar } from "react-icons/bi";
import { BiBookmark } from "react-icons/bi";


// Styled Components
import { InteractButtons } from "../../styled/posts/interactButtons";

export default function InteractButtonsComponent() {
    return (
        <InteractButtons>
        <BiStar/>
        <BiPaperPlane/>
        <BiBookmark/>
        </InteractButtons>
    );
    }