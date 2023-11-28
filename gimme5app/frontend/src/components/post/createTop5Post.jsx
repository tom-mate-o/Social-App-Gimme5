import React from "react";
import InteractButtonsComponent from "../post/interactButtonsComponent";
import HashtagCloudComponent from "../post/hastagCloudComponent";
import FiveListComponent from "../post/fiveListComponent";
import PostTitleComponent from "../post/postTitleComponent";
import PostInfoComponent from "../post/postInfoComponent";
import PostCategoryComponent from "./postCategoryComponent";
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

export default function CreateTop5Post() {
    const [topFivePosts, setTopFivePosts] = useMondoDBData([]);
    const [userData, setUserData] = useMongoDBUserData([]);

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
            {topFivePosts.slice().reverse().map((post, index) => (
                <Post key={index}>
                    <div className="post_content">
                    <div className="post_top_row">
                        <div className="avatar_username_container">
                        <div>{post.user && <img src={findAvatarUrl(post.user, userData)} className="useravatar" alt={post.user} />}</div>
                        <div><PostInfoComponent user={post.user} /></div>
                        </div>
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
