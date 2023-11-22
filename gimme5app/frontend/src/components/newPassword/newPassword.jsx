import React, { useState } from 'react';
import { useRef } from 'react';
import showNotification from '../showNotifications/showNotifications';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function NewPassword() {

  const [page, setPage] = useState("email");
  const formRef = useRef();
  const [equal, setEqual] = useState(false);
  const [resetAllowed, setResetAllowed] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [emailToken, setEmailToken] = useState("");
  const navigate = useNavigate();


  const checkPassword = (formRefCurrent, setEqual) => {
      // wenn PW1 und PW2 gleich sind, dann ist setEqual true
    const isEqual = formRefCurrent.password1.value === formRefCurrent.password2.value;
    setEqual(isEqual);
  }


  // E-MAIL ----------------------------------------------------
  const onClickEmail = async (event, formRef) => {
    event.preventDefault();
    const email = formRef.current.email.value;

        //config object for post request
        const config = {
          url: "http://localhost:8080/api/auth/resetpassword",
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          data: { email: email }, // email wird ans backend geschickt
        };

        try {
          const response = await axios(config);
          // warten auf response vom backend
          // resetCode und Token werden im backend generiert und kommen so ins frontend
          const { code, token, message } = response.data;
          setResetCode(code); //resetCode wird im Frontend gesetzt

          localStorage.setItem("email", token); // token wird unter "email" im local storage gespeichert
          setEmailToken(token); //emailToken wird im Frontend gesetzt
        
          if (page === "email"){ // wenn page = email, dann wird page auf code gesetzt
            setPage("code"); // die pages werden unter return gerendert/definiert
          }
        } catch (error) {
          console.error(error);
        }


  };


  // CODE ----------------------------------------------------
  const onClickCode = async (event, formRef) => {
    event.preventDefault();
    const code = formRef.current.code.value;
    // stimmt der eingegebene code mit dem resetCode der im Backend erzeugt wurde überein?
    // user bekommt code per mail
    if (code == resetCode) {
      setResetAllowed(true);
    // dann wird auf die Seite newpassword weitergeleitet
      setPage("newpassword")
    } else {
      showNotification("Wrong Code", "error");
    }
  };
 
  // NEW PASSWORD ----------------------------------------------------
  const onClickNewPassword = async (event, formRef) => {
    event.preventDefault();
    // das neue Passwort, das der User eigegeben hat wird abgegriffen.
    // es muss mit beiden Feldern übereinstimmen. Das wird oben definiert. (isEqual)
    const password = formRef.current.password1.value;
    if (equal === false) {
      showNotification("Passwords do not match", "warn");
      return;
    }

     //config object for post request
      const config = {
      url: "http://localhost:8080/api/auth/reset/newpassword",
      method: "put", // put request, weil etwas geändert wird
      headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${emailToken}` // token wird mitgeschickt
                // als Bearer token. Bearer steht für "träger"
              },
      data: { password: password }, // password wird ans backend geschickt
      };

      try{
        const response = await axios(config);
        // warten auf response vom backend
        // wenn das PW ändern im backend erfolgreich war, dann wird 200 zurückgegeben
        if (response.status === 200) {
        showNotification("Password successfully changed", "success");
        } 
        setEmailToken(""); // emailToken wird wieder gelöscht
        localStorage.removeItem("email"); // email wird aus dem local storage gelöscht

        if (page === "newpassword"){
          navigate('/login'); // danach wird auf die login seite weitergeleitet
        } 

      } catch (error) {
        console.error(error);
      }

    
  };


  return (
    <div className="login">
      <h3>Reset Password</h3>
      {page === "email" && (
        <form
          className="newpassword"
          ref={formRef}
          onSubmit={(event) => onClickEmail(event, formRef)}
        >
          <p>
            Type in your E-Mail. We'll send you a 6-Digit Code to reset your
            Password.
          </p>
          <input type="email" name="email" placeholder="E-Mail" />
          <button type="submit">Next</button>
        </form>
      )}

      {page === "code" && (
        <form
          className="newpassword"
          ref={formRef}
          onSubmit={(event) => onClickCode(event, formRef)}
        >
          <p>Please type in the 6-Digit Code you recieved by E-Mail.</p>
          <input type="text" name="code" placeholder="Code" />
          <button type="submit">Next</button>
        </form>
      )}

      {page === "newpassword" && (
        <form
          className="newpassword"
          ref={formRef}
          onSubmit={(event) => onClickNewPassword(event, formRef)}
        >
          <p>Please type in your new Password.</p>
          <p>(6 Digits and at least one capital Letter)</p>
          <input
            type="password"
            name="password1"
            placeholder="New Password"
            required
            minlength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={() => checkPassword(formRef.current, setEqual)}
          />
          <input
            type="password"
            name="password2"
            placeholder="Repeat New Password"
            required
            minlength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={() => checkPassword(formRef.current, setEqual)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}