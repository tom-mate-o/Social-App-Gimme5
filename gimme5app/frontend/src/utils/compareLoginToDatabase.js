import axios from 'axios';
import showNotification from '../components/showNotifications/showNotifications';

export async function compareLoginToDatabase(data) {
    try {

        const config = {
            method: 'post', // Hier wird eine POST-Anfrage gesendet
            url: "http://localhost:8080/api/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        const res = await axios(config);
        console.log(res.data);
        showNotification("You're logged in! \nWelcome back to GIMME5 🤗", "success");

        return res.data; // Login Data erfolgreich mit DB abgeglichen

    } catch (error) {
        console.error("Fetch in Frontend fehlgeschlagen");
        if (error.response.status === 401){
            showNotification("Passwort is incorrect! 😵", "warn");
        } else if (error.response.status === 404){
            showNotification("User does not exist! 🤔", "warn");
        } else {
        showNotification("Login failed... 😐", "error");
        }
        return false; // Login Data konnte nicht mit DB abgeglichen werden
    }
}