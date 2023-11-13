import axios from "axios";
import showNotification from "../components/showNotifications/showNotifications";

export async function deleteTopFiveFromDatabase(id) {
    try {
        await axios.delete(`http://localhost:8080/deletetopfive/${id}`);
        showNotification("Top 5 List deleted", "success");
        return true; // Erfolgreich gelöscht
    } catch (error) {
        console.error("Delete failed");
        showNotification("Ooops, something went wrong", "error");
        return false; // Fehler beim Löschen
    }
}
