import axios from "axios";

export async function deleteTopFiveFromDatabase(id) {
    try {
        await axios.delete(`http://localhost:8080/deletetopfive/${id}`);
        return true; // Erfolgreich gelöscht
    } catch (error) {
        console.error("Delete failed");
        return false; // Fehler beim Löschen
    }
}
