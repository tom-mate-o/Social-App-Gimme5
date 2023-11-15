import axios from "axios";
import showNotification from "../components/showNotifications/showNotifications";

export async function registerUserAndAddToDatabase(formData) {
  try {
    const config = {
      method: "post", // Hier wird eine POST-Anfrage gesendet
      url: "http://localhost:8080/api/register",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    const res = await axios(config);
    console.log(res.data);
    showNotification("User registered. \nWelcome to GIMME5", "success");

    return true; // UserData erfolgreich in DB gespeichert
    // navigiere zu Login
    //
  } catch (error) {
    console.error("Fetch in Frontend fehlgeschlagen");
    if (error.response.status === 409) {
      showNotification("Username already taken!", "warn");
    } else if (error.response.status === 422) {
      showNotification("E-Mail already taken!", "warn");
    } else if (error.response.status === 400) {
      showNotification("Required field missing!", "warn");
    } else if (error.response.status === 406) {
      showNotification(
        "HOW DARE YOU!!! 🤬 Username contains inappropriate language!",
        "warn"
      );
    } else {
      showNotification("Ooops, something went wrong", "error");
    }
    return false; // UserData konnte nicht in DB gespeichert werden
  }
}
