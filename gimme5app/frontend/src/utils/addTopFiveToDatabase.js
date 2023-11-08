import axios from 'axios';

export async function addTopFiveToDatabase(newPost) {
    try {

        const config = {
            method: 'post', // Hier wird eine POST-Anfrage gesendet
            url: "http://localhost:8080/addtopfive",
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newPost),
        }
        const res = await axios(config);
        console.log(res.data.message);
        return true; // Top 5 erfolgreich in DB gespeichert
    } catch (error) {
        console.error("Fetch in Frontend fehlgeschlagen");
        return false; // Top 5 konnte nicht in DB gespeichert werden
    }
}