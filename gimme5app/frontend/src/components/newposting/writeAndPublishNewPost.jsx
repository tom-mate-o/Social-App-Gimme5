import React, {useRef} from "react";

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

    return (
        <div className="newPost">
        <h1>New Post</h1>

        <select ref={refcategory} id="category" name="category">
        <option value="" disabled selected>Choose a category</option>
        <option value="apfel">Apfel</option>
        <option value="banane">Banane</option>
        <option value="kirsche">Kirsche</option>
        <option value="orange">Orange</option>
        <option value="birne">Birne</option>
        </select>

        <select ref={refsubcategory} id="subcategory" name="subcategory">
        <option value="" disabled selected>Choose or create a subcategory</option>
        <option value="apfel">Apfel</option>
        <option value="banane">Banane</option>
        <option value="kirsche">Kirsche</option>
        <option value="orange">Orange</option>
        <option value="birne">Birne</option>
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



        <button onClick={() => {
            console.log(refcategory.current.value);
            console.log(refsubcategory.current.value);
            console.log(ref1stplace.current.value);
            console.log(ref2ndplace.current.value);
            console.log(ref3rdplace.current.value);
            console.log(ref4thplace.current.value);
            console.log(ref5thplace.current.value);
            console.log(refhashtags.current.value);
            console.log("post private " + refPostPrivate.current.checked);
            refcategory.current.value = "";
            refsubcategory.current.value = "";
            ref1stplace.current.value = "";
            ref2ndplace.current.value = "";
            ref3rdplace.current.value = "";
            ref4thplace.current.value = "";
            ref5thplace.current.value = "";
            refhashtags.current.value = "";
            refPostPrivate.current.checked = false;
        }}>Publish</button>


        </div>
    );
    }
