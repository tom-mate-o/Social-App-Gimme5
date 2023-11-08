require('dotenv').config(); // Laden von Umgebungsvariablen aus .env

const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
    const connection = mongoose.createConnection(process.env.MONGO_DB_CLIENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection.once("error", () => {
      console.log("Error connecting to MongoDB");
    });
    connection.once("open", () => {
      console.log("Connected to MongoDB");
    });


    // Schema
  const topFiveSchema = new mongoose.Schema({
    id: String,
    user: String,
    category: String,
    subcategory: String,
    list: [
      {
        place1: String,
        place2: String,
        place3: String,
        place4: String,
        place5: String,
      },
    ],
    hashtags: [String],
    likes: Number,
    postprivate: Boolean,
  });

  const TopFive = connection.model("TopFiveCollection", topFiveSchema); // TopFiveCollection ist der Namer der Collection in der DB

  // Methode um TopFive Liste in die DB zu schreiben
app.post("/addtopfive", async (req, res) => {
  try{
    const topFiveToAdd = req.body;
    console.log(topFiveToAdd);
    const addedTopFive = await TopFive.create(topFiveToAdd);
    res.status(201).send({"message": "TopFive added successfully to DB"});
  } catch (error) {
    console.error(error);
    res.status(500).send({"message": "Error while adding TopFive to DB"});
  }
});

// Methode um  TopFive Listen aus der DB zu lesen

app.get("/gettopfives", async (req, res) => {
  try{
    const getTopFiveLists = await TopFive.find({}); //sucht alle TopFive Listen in der DB nach {} = alle
    console.log(getTopFiveLists);
    res.status(200).send({"message": "TopFive Lists successfully fetched from DB", "data": getTopFiveLists}); // Send the fetched data
  } catch {
    res.status(500).send({"message": "Error while fetching TopFive Lists from DB"});
  }
}
);
  

// Routen
app.get('/', (req, res) => {
  res.send('Huhu! app.js is here');
});


app.get('/db-status', (req, res) => {
  let state = 'Unknown';
  switch (connection.readyState) {
    case 0:
      state = 'Disconnected';
      break;
    case 1:
      state = 'Connected';
      break;
    case 2:
      state = 'Connecting';
      break;
    case 3:
      state = 'Disconnecting';
      break;
  }
  res.send(`Database connection state: ${state}`);
 
});


app.get("/health-check", (req, res) => {
  res.status(200).send({message: "I'm alive. Greetings from the backend."});
});

app.listen(port, () => {
  console.log(`app.js here - Example app listening on port ${port}`);
});



