import React from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";
import ProfileInfoComponent from "./profileInfoComponent";
import PostCategoryComponent from "../post/postCategoryComponent";
import DeleteTopFive from "../delete/deleteTopFive";
import { deleteTopFiveFromDatabase } from "../../utils/deleteTopFiveFromDatabase";
import { useEffect } from "react";
import { findAvatarUrl } from "../../utils/findAvatarUrlOfUser";

//Styled Components
import { Post } from "../../styled/posts/post";
import { SocialBar } from "../../styled/posts/socialBar";

// Costum Hooks
import useMondoDBData from "../customHooks/useMondoDBData";
import useMongoDBUserData from "../customHooks/useMongoDBUserData";

export default function CreateProfilePlusPosts() {
    const [topFivePosts, setTopFivePosts] = useMondoDBData([]);
    const [userData, setUserData] = useMongoDBUserData([]);
    const loggedInUser = localStorage.getItem("username");
    console.log("loggedInUser: ", loggedInUser);

    useEffect(() => {
        if (userData) {
        }
      }, [userData]);




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
            <ProfileInfoComponent user={loggedInUser}/>
            {topFivePosts.filter(post => post.user === loggedInUser).slice().reverse().map((post, index) => (
                <Post key={index}>
                    <div className="post_content">
                    <div className="post_top_row">
                        <DeleteTopFive onDelete={() => onDelete(post.id)} />
                    </div>
                        
                        <PostCategoryComponent category={post.category} />
                        <PostTitleComponent title={post.subcategory} />
                        <FiveListComponent list={post.list} />
                    </div>
                    <SocialBar>
                        <HashtagCloudComponent hashtags={post.hashtags} />
                        <InteractButtonsComponent likes={post.likes} id={post.id} topFivePosts={topFivePosts} setTopFivePosts={setTopFivePosts}/>
                    </SocialBar>
                </Post>
            ))}
        </div>
    );
}
