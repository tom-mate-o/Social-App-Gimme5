import axios from 'axios';
import showNotification from '../components/showNotifications/showNotifications';

export async function registerUserAndAddToDatabase(formData) {
    try {

        const config = {
            method: 'post', // Hier wird eine POST-Anfrage gesendet
            url: "http://localhost:8080/api/register",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
        }
        const res = await axios(config);
        console.log(res.data);
        showNotification("User registered. \nWelcome to GIMME5", "success");

        return true; // UserData erfolgreich in DB gespeichert
        // navigiere zu Login
        //
    } catch (error) {
        console.error("Fetch in Frontend fehlgeschlagen");
        showNotification("Ooops, something went wrong", "error");
        return false; // UserData konnte nicht in DB gespeichert werden
    }
}