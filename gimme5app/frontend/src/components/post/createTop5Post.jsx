import React from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";
import PostCategoryComponent from "./postCategoryComponent";
import DeleteTopFive from "../delete/deleteTopFive";
import { deleteTopFiveFromDatabase } from "../../utils/deleteTopFiveFromDatabase";

//Styled Components
import { Post } from "../../styled/posts/post";
import { SocialBar } from "../../styled/posts/socialBar";


// Costum Hooks
import useMondoDBData from "../customHooks/useMondoDBData";



export default function CreateTop5Post() {

    const [topFivePosts, setTopFivePosts] = useMondoDBData([]);

    const onDelete = async (topFiveId) => {
        try {
            await deleteTopFiveFromDatabase(topFiveId);
            console.log("hi from onDelete");
            setTopFivePosts(prevPosts => prevPosts.filter((post) => post.id !== topFiveId));
        } catch (error) {
            console.log("Error deleting post: ", error);
        }
    };

    return (

        <div>
            {topFivePosts.slice().reverse().map((post, index) => (
                <Post key={index}>
                    <div className="post_content">
                        <DeleteTopFive onDelete={() => onDelete(post.id)} />
                        <PostInfoComponent user={post.user} />
                        <PostCategoryComponent category={post.category} />
                        <PostTitleComponent title={post.subcategory} />
                        <FiveListComponent list={post.list} />
                    </div>
                    <SocialBar>
                        <HashtagCloudComponent hashtags={post.hashtags} />
                        <InteractButtonsComponent likes={post.likes} />

                    </SocialBar>
                </Post>
            ))}


        </div>
    );
}
