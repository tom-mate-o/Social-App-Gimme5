import React, {useRef} from "react";
import { addTopFiveToDatabase } from "../../utils/addTopFiveToDatabase";
import {v4 as uuidv4} from "uuid";

export default function WriteAndPublishNewPost() {
    const refcategory = useRef();
    const refsubcategory = useRef();
    const ref1stplace = useRef();
    const ref2ndplace = useRef();
    const ref3rdplace = useRef();
    const ref4thplace = useRef();
    const ref5thplace = useRef();
    const refhashtags = useRef();
    const refPostPrivate = useRef();


    function handleButtonClick(){
        const category = refcategory.current.value;
        const subcategory = refsubcategory.current.value;
        const place1 = ref1stplace.current.value;
        const place2 = ref2ndplace.current.value;
        const place3 = ref3rdplace.current.value;
        const place4 = ref4thplace.current.value;
        const place5 = ref5thplace.current.value;
        const hashtags = refhashtags.current.value.split(/[\s;,]+/);
        const isPrivate = refPostPrivate.current.checked;
        const likes = 0;


        const newPost = {
            id: uuidv4(),
            user: "user1",
            category,
            subcategory,
            list: [{ place1, place2, place3, place4, place5 }],
            hashtags,
            isPrivate,
            likes,
          };
        
          addTopFiveToDatabase(newPost);

          refcategory.current.value = "";
          refsubcategory.current.value = "";
          ref1stplace.current.value = "";
          ref2ndplace.current.value = "";
          ref3rdplace.current.value = "";
          ref4thplace.current.value = "";
          ref5thplace.current.value = "";
          refhashtags.current.value = "";
          refPostPrivate.current.checked = false;
        }

    return (
        <div className="newPost">
        <h1>New Post</h1>

        <select ref={refcategory} id="category" name="category">
        <option value="" disabled selected>Choose a category</option>
        <option value="Animals">Animals</option>
        <option value="Books">Books</option>
        <option value="Food">Food</option>
        <option value="Games">Games</option>
        <option value="Miscellaneous">Miscellaneous</option>
        <option value="Movies">Movies</option>
        <option value="Music">Music</option>
        <option value="Series">Series</option>
        <option value="Travelling">Travelling</option>

        </select>

        <select ref={refsubcategory} id="subcategory" name="subcategory">
        <option value="" disabled selected>Choose or create a subcategory</option>
        <option value="Ungeeignetsten Haustiere">Ungeeignetsten Haustiere</option>
        <option value="Sci-Fi Bücher">Sci-Fi Bücher</option>
        <option value="Pizza Sorten">Pizza Sorten</option>
        <option value="90s Songs">90s Songs</option>
        <option value="Brettspiele">Brettspiele</option>
        </select>

        <input ref={ref1stplace} id="1stplace" type="text" placeholder="1st Place" />

        <input ref={ref2ndplace} id="2ndplace" type="text" placeholder="2nd Place" />

        <input ref={ref3rdplace} id="3rdplace" type="text" placeholder="3rd Place" />

        <input ref={ref4thplace} id="4thplace" type="text" placeholder="4th Place" />

        <input ref={ref5thplace} id="5thplace" type="text" placeholder="5th Place" />

        <input ref={refhashtags} id="hashtags" type="text" placeholder="Hashtags" />

        <div className="checkbox">
            <label>
        <input ref={refPostPrivate} type="checkbox"></input>
        post private
        </label>
        </div>



        <button onClick={handleButtonClick}>Publish</button>


        </div>
    );
    }
