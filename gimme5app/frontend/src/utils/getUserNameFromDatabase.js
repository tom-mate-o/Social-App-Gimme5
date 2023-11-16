import axios from "axios";

export async function getUserNameFromDatabase(email) {
  console.log(`http://localhost:8080/getusername?email=${email}`);

  try {
    const config = {
      method: 'get',
      url: `http://localhost:8080/getusername?email=${email}`,
      headers: {
          "Content-Type": "multipart/form-data",
      }
    };

    const res = await axios(config);
    console.log(res.data);

    if (res.data && res.data.data && res.data.data.length > 0) {
      console.log(res.data.data[0].username);
      return res.data.data[0].username;
    } else {
      console.error("No user data received");
      return null;
    }
  } catch (error) {
    console.error("Error during axios call:", error);
    return null;
  }
}