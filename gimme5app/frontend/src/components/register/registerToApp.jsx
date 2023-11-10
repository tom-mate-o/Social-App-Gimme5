import React, { useRef } from "react";
import {v4 as uuidv4} from "uuid";
import { registerUserAndAddToDatabase } from "../../utils/registerUserAndAddToDatabase";

export default function RegisterToApp() {
  const username = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const password = useRef();
  const password2 = useRef();
  const email = useRef();
  const email2 = useRef();
  const location = useRef();

  const formRef = useRef();

  const registerUser = async(e) => {
    e.preventDefault();
    const form = formRef.current;
    const formData = new FormData(form);
    formData.append('id', uuidv4());
    formData.append('role', 'user');
    console.log(formData);
    registerUserAndAddToDatabase(formData);
    }
  
   

  return (
    <div className="register">
      <h1>REGISTER</h1>

      <form
        ref={formRef}
        className="register-form"
        onSubmit={(e) => {
          registerUser(e);
          // username.current.value = "";
          // firstname.current.value = "";
          // lastname.current.value = "";
          // password.current.value = "";
          // password2.current.value = "";
          // email.current.value = "";
          // email2.current.value = "";
          // location.current.value = "";
        }}
      >
        <input style={{ display: "none" }} type="file" id="file" name="avatar" />
        <label
          htmlFor="file"
          style={{
            cursor: "pointer",
            padding: "10px",
            backgroundColor: "white",
            color: "black",
          }}
        >
          Select a Profile Picture
        </label>

        <input
          ref={username}
          name="username"
          id="username"
          type="text"
          placeholder="Username*"
          required
        />

        <input
          ref={firstname}
          name="firstname"
          id="firstname"
          type="text"
          placeholder="First Name*"
          required
        />
        <input
          ref={lastname}
          name="lastname"
          id="lastname"
          type="text"
          placeholder="Last Name"
          required
        />

        <input
          ref={password}
          name="password"
          id="password"
          type="password"
          placeholder="Password*"
          required
        />

        <input
          ref={password2}
          name="password2"
          id="password2"
          type="password"
          placeholder="Repeat Password*"
          required
        />

        <input
          ref={email}
          name="email"
          id="email"
          type="email"
          placeholder="Email*"
          required
        />
        <input
          ref={email2}
          name="email2"
          id="email2"
          type="email"
          placeholder="Repeat Email*"
          required
        />

        <input
          ref={location}
          name="location"
          id="location"
          type="text"
          placeholder="Location"
        />

        <button type="submit">Register</button>
      </form>

      <p>*Pflichtfeld</p>
    </div>
  );
}
