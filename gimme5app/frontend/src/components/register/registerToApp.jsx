import React, { useRef } from "react";

export default function RegisterToApp() {
  const username = useRef();
  const firstname = useRef();
  const lastname = useRef();
  const password = useRef();
  const password2 = useRef();
  const email = useRef();
  const email2 = useRef();
  const location = useRef();

  return (
    <div className="register">
      <h1>REGISTER</h1>

      <form className="register-form">
        <input style={{ display: "none" }} type="file" id="file" name="file" />
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

        <input ref={username} id="username" type="text" placeholder="Username*" required />

        <input
          ref={firstname} id="firstname" type="text" placeholder="First Name*" required />
        <input ref={lastname} id="lastname" type="text" placeholder="Last Name" required />

        <input
          ref={password}
          id="password"
          type="password"
          placeholder="Password*"
          required
        />

        <input
          ref={password2}
          id="password2"
          type="password"
          placeholder="Repeat Password*"
          required
        />

        <input ref={email} id="email" type="email" placeholder="Email*" required />
        <input ref={email2} id="email2" type="email" placeholder="Repeat Email*" required />

        <input ref={location} id="location" type="text" placeholder="Location" />

        <button
          onClick={() => {
            console.log(username.current.value);
            console.log(firstname.current.value);
            console.log(lastname.current.value);
            console.log(password.current.value);
            console.log(password2.current.value);
            console.log(email.current.value);
            console.log(email2.current.value);
            console.log(location.current.value);
            username.current.value = "";
            firstname.current.value = "";
            lastname.current.value = "";
            password.current.value = "";
            password2.current.value = "";
            email.current.value = "";
            email2.current.value = "";
            location.current.value = "";
          }}
        >
          Register
        </button>
      </form>

      <p>*Pflichtfeld</p>
    </div>
  );
}
