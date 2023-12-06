import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

export default function DeleteTopFive({onDelete}) {

    const handleDeleteClick = () => {
        console.log("Trash Icon clicked");
        onDelete();
    }

    return (
        <HiOutlineTrash className="trashicon" onClick={handleDeleteClick}/>
    );
}