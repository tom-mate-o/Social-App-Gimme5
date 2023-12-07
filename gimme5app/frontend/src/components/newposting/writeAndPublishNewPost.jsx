//writeAndPublishNewPost.jsx

import React, { useRef, useContext } from "react";
import { addTopFiveToDatabase } from "../../utils/addTopFiveToDatabase";
import { v4 as uuidv4 } from "uuid";
import showNotification from "../showNotifications/showNotifications";
import UsernameContext from "../userName/userNameContext";
import BadWordsNext from 'bad-words-next';
import en from 'bad-words-next/data/en.json';
import es from 'bad-words-next/data/es.json';
import fr from 'bad-words-next/data/fr.json';
import de from 'bad-words-next/data/de.json';
import ru from 'bad-words-next/data/ru.json';
import rl from 'bad-words-next/data/ru_lat.json';
import ua from 'bad-words-next/data/ua.json';
import pl from 'bad-words-next/data/pl.json';
import ch from 'bad-words-next/data/ch.json';

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
  const formRef = useRef();
  const { username } = useContext(UsernameContext);

  const badwords = new BadWordsNext()
  badwords.add(en)
  badwords.add(es)
  badwords.add(fr)
  badwords.add(de)
  badwords.add(ru)
  badwords.add(rl)
  badwords.add(ua)
  badwords.add(pl)
  badwords.add(ch)

  function handleButtonClick(e) {
e.preventDefault();
    const form = formRef.current;

    const category = form.category.value;
    const subcategory = form.subcategory.value;
    const place1 = form.firstplace.value;
    const place2 = form.secondplace.value;
    const place3 = form.thirdplace.value;
    const place4 = form.fourthplace.value;
    const place5 = form.fithplace.value;
    const hashtags = form.hashtags.value.split(/[,;\s]+/);
    const isPrivate = form.checkbox.value;
    const likes = 0;

    if (
        badwords.check(subcategory.toString()) ||
        badwords.check(place1.toString()) ||
        badwords.check(place2.toString()) ||
        badwords.check(place3.toString()) ||
        badwords.check(place4.toString()) ||
        badwords.check(place5.toString()) ||
        badwords.check(hashtags.toString())
      ) {
        showNotification("No bad words allowed", "error");
        return;
      }


    const newPost = {
      id: uuidv4(),
      user: username,
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
      <form ref={formRef} onSubmit={handleButtonClick}>
        <select ref={refcategory} id="category" name="category" required="required">
          <option value="">
            Choose a category
          </option>
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
        <h4>Top 5...</h4>
        <input
          ref={refsubcategory}
          id="subcategory"
          type="text "
          name="subcategory"
          placeholder="Title for your Top 5 List"
          required="required"
          minLength={3}
          maxLength={50}
        />
        <br />
        <input
          ref={ref1stplace}
          id="1stplace"
          name="firstplace"
          type="text"
          placeholder="1st Place"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <input
          ref={ref2ndplace}
          id="2ndplace"
          name="secondplace"
          type="text"
          placeholder="2nd Place"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <input
          ref={ref3rdplace}
          id="3rdplace"
          name="thirdplace"
          type="text"
          placeholder="3rd Place"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <input
          ref={ref4thplace}
          id="4thplace"
          name="fourthplace"
          type="text"
          placeholder="4th Place"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <input
          ref={ref5thplace}
          id="5thplace"
          name="fithplace"
          type="text"
          placeholder="5th Place"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <input
          ref={refhashtags}
          id="hashtags"
          name="hashtags"
          type="text"
          placeholder="Hashtags"
          required="required"
          minLength={3}
          maxLength={50}
        />

        <div className="checkbox">
          <label>
            <input ref={refPostPrivate} name="checkbox" id="checkbox" type="checkbox"></input>
            post private
          </label>
        </div>

        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
