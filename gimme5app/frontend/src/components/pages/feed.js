import React, { useState } from "react";
import CreateTop5Post from "../post/createTop5Post";
import { PostContainer } from "../../styled/posts/postContainer";

const Feed = () => {
  const [top5posts] = useState([
    {
        id: 1,
        user: "tom-mate-o",
        category: "Games",
        subcategory: "Nintendo Games",
        list: [{ place1: "Super Mario Bros 3" }, { place2: "The Legend of Zelda BOTW" }, { place3: "Pokemon Gold" }, { place4: "Donkey Kong Country 2" }, { place5: "Metroid Prime" }],
        hashtags: ["#games", "#alltime", "#nintendo"],
        likes: 201,
      },
      {
        id: 2,
        user: "catOnKeyboard",
        category: "Food",
        subcategory: "Pizza Sorts",
        list: [{ place1: "Margherita" }, { place2: "Salami" }, { place3: "Hawaii" }, { place4: "Funghi" }, { place5: "Quattro Formaggi" }],
        hashtags: ["#pizza", "#food", "#italy"],
        likes: 10,
      },
      {id: 3,
      user: "whatTheDuck",
      category: "Food",
      subcategory: "Snacks for a Movie Night",
      list: [{ place1: "Popcorn" }, { place2: "Nachos" }, { place3: "Chips" }, { place4: "Peanuts" }, { place5: "Chocolate" }],
      hashtags: ["#snacks", "#food", "#movie"],
      likes: 3,
      },
      {id: 4,
      user: "MisterX",
      category: "Movies",
      subcategory: "Best Movies with Tom Hanks",
      list: [{ place1: "Forrest Gump" }, { place2: "Cast Away" }, { place3: "Saving Private Ryan" }, { place4: "The Green Mile" }, { place5: "Toy Story" }],
      hashtags: ["#movies", "#tomhanks", "#bestof"],
      likes: 761,
      },
  ]);

  return (
    <div>
      <PostContainer>
        <CreateTop5Post top5posts={top5posts}/>
      </PostContainer>
    </div>
  );
}

export default Feed;