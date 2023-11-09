import React from "react";
import { useEffect } from "react";
import { getTopFiveFromDatabase } from "../../utils/getTopFiveFromDatabase";

export default function useMondoDBData() {
    const [topFivePosts, setTopFivePosts] = React.useState([]); // Set initial value to an empty array
    useEffect(() => {
        loadTopFiveFromDatabase();
    }, []);

    const loadTopFiveFromDatabase = () => {
        try {
            getTopFiveFromDatabase(setTopFivePosts);
            console.log("Daten kommen aus MongoDB");
        } catch (error) {
            console.log("Oops, da ist was schief gelaufen: ", error);
        }
    };

    return [topFivePosts, setTopFivePosts];
}