import React from "react";
import { useEffect } from "react";
import { getUserDataFromDatabase } from "../../utils/getUserDataFromDatabase";

export default function useMongoDBUserData() {
    const [userData, setUserData] = React.useState([]); // Set initial value to an empty array
    useEffect(() => {
        loadUserDataFromDatabase();
    }, []);

    const loadUserDataFromDatabase = () => {
        try {
            getUserDataFromDatabase(setUserData);
            console.log("Daten kommen aus MongoDB");
        } catch (error) {
            console.log("Oops, da ist was schief gelaufen: ", error);
        }
    };

    return [userData, setUserData];
}