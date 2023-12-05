import axios from "axios";
import showNotification from "../components/showNotifications/showNotifications";

export async function deleteCommentFromPost(id, commentId) {
    try {
        const res = await axios.delete(`http://localhost:8080/deletecomment/${id}`, { data: { commentId } });
        if (res.status === 200) {
            showNotification("Comment deleted", "success");
        }
        return true; // Erfolgreich gelöscht
    } catch (error) {
        console.error("Delete failed");
        showNotification("Ooops, something went wrong", "error");
        return false; // Fehler beim Löschen
    }
}

