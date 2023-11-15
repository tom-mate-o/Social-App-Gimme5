import React, { useRef } from "react";
import {v4 as uuidv4} from "uuid";
import { registerUserAndAddToDatabase } from "../../utils/registerUserAndAddToDatabase";
import showNotification from "../showNotifications/showNotifications";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

    

  const registerUser = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    // Zugriff auf die einzelnen Eingabefelder über das name-Attribut
    const form = formRef.current;
    const id = uuidv4();
    formData.append("id", id);

    // Überprüfen, ob ein Bild ausgewählt wurde, und wenn ja, zur formData hinzufügen ansonsten Dummy
    let file;
    if (form.avatar.files[0]) {
      file = form.avatar.files[0];
    } else {
      const response = await fetch('../assets/img/dummy.jpg');
      const data = await response.blob();
      file = new File([data], "dummy.jpg", { type: "image/jpeg" });
    }


    formData.append("avatar", file);
    formData.append("username", form.username.value);
    formData.append("firstname", form.firstname.value);
    formData.append('lastname', form.lastname.value);
    formData.append('password', form.password.value);
    formData.append('password2', form.password2.value);
    formData.append('email', form.email.value);
    formData.append('email2', form.email2.value);
    formData.append('location', form.location.value);
    formData.append('role', 'user');
    console.log(formData);

    if (form.password.value !== form.password2.value) {
      showNotification("Passwords do not match", "warn");
      return;
    }

    if (form.email.value !== form.email2.value) {
      showNotification("Emails do not match", "warn");
      return;
    }
      
    async function navigateToLogin(){
      const result = await registerUserAndAddToDatabase(formData);
      if(result){
        navigate('/login');
      } else {
        showNotification("Can't register user", "error");
      }
    }

    navigateToLogin();

    };
    
   
  
   

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
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name="avatar"
        />
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
          minLength="3"
          maxLength="25"
          required
        />

        <input
          ref={firstname}
          name="firstname"
          id="firstname"
          type="text"
          placeholder="First Name*"
          minLength="3"
          maxLength="25"
          required
        />
        <input
          ref={lastname}
          name="lastname"
          id="lastname"
          type="text"
          placeholder="Last Name"
        />

        <input
          ref={password}
          name="password"
          id="password"
          type="password"
          placeholder="Password*"
          required
          minlength="6"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
        />

        <input
          ref={password2}
          name="password2"
          id="password2"
          type="password"
          placeholder="Repeat Password*"
          required
          minlength="6"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
        />

        <input
          ref={email}
          name="email"
          id="email"
          type="email"
          placeholder="Email*"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
        />
        <input
          ref={email2}
          name="email2"
          id="email2"
          type="email"
          placeholder="Repeat Email*"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
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
