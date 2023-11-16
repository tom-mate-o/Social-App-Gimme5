import axios from "axios";

export async function getUserDataFromDatabase(setCallBackFun) {
    try {
        const config = {
            method: "get",
            url: "http://localhost:8080/getuserdata",
            headers: {
                "Content-Type": "multipart/form-data",
            }
        };
        const res = await axios(config);
        console.log(res.data.message);
        setCallBackFun(res.data.data); // Set the state with the fetched data

    } catch (error) {
        console.error("Fetch in Frontend fehlgeschlagen");
    }
}
