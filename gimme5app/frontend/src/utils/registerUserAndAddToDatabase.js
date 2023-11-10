import axios from 'axios';

export async function registerUserAndAddToDatabase(formData) {
    try {

        const config = {
            method: 'post', // Hier wird eine POST-Anfrage gesendet
            url: "http://localhost:8080/api/register",
            data: formData,
        }
        const res = await axios(config);
        console.log(res.data);
        return true; // UserData erfolgreich in DB gespeichert
        // navigiere zu Login
        //
    } catch (error) {
        console.error("Fetch in Frontend fehlgeschlagen");
        return false; // UserData konnte nicht in DB gespeichert werden
    }
}