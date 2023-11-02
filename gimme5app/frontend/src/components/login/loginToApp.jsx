import React, { useRef } from "react";

export default function LoginToApp() {
  const username = useRef();
  const password = useRef();

  return (
    <div className="login">
      <h1>LoginToApp</h1>

      <p>
        Kurze App-Beschreibung. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </p>

      <input ref={username} id="username" type="text" placeholder="Username" />

      <input
        ref={password}
        id="password"
        type="password"
        placeholder="Password"
      />

      <button
        onClick={() => {
          console.log(username.current.value);
          console.log(password.current.value);
        }}
      >
        Login
      </button>

      <a href="/login">Forgot Password?</a>
      <p>Don't have an account yet? <a href="/register">Register here.</a> </p>
    </div>
  );
}
