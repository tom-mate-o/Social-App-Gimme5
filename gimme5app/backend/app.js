require('dotenv').config(); // Laden von Umgebungsvariablen aus .env

const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// Multer Middleware (Images)
const multer = require('multer');


// Middleware
app.use(express.json());
app.use(cors());

// Speichern der Dateien im Ordner uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${avatar.originalname}`);
  },
});

const avatar = multer({ storage });




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


    // Schema für Post
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


  // Schaema für User

  const userSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    username:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    location: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  });

  const UserModel = mongoose.model("usercollection", userSchema); // UserCollection ist der Namer der Collection in der DB


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

// Methode um eine TopFive Liste aus der DB zu löschen

app.delete("/deletetopfive/:id", async (req, res) => {
  try{
    const topFiveId = req.params.id;
    await TopFive.findOneAndDelete({id: topFiveId});
    res.status(200).send({"message": "TopFive List successfully deleted from DB"});
  } catch (error){
    res.status(500).send({"message": "Error while deleting TopFive List from DB"});
  }
});
  

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


// Post Register ----------------------------------------------

// Middleware für multipart formdata
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", avatar.single("avatar"), async (req, res) => { 
  console.log(req.body); // Textfelder des Formulars
  console.log(req.file); // Hochgeladene Dateien

  try{
  
    const {id, avatar, username, firstname, lastname, password, email, location, role} = req.body;
    
    if(! id || !username || !firstname || !lastname || !password || !email || !location || !role) {
    return res.status(404).send({message: "Required Field Missing"});
      }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log(avatarUrl); // ✅


    // const existingUser = await User.findOne({email});
    // console.log('Existing user', existingUser);
    // if(existingUser) {
    // return res.status(409).send({message: "User already exists"});
    //   }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword); // ✅

   const userToAdd = new UserModel({id, avatarUrl, username, firstname, lastname, hashedPassword, email, location, role});
   console.log("hi"); // ✅
   console.log(userToAdd); // ✅

    const userCreated = await UserModel.create(userToAdd);
    console.log("creating"); // ❌
    res.status(201).send({message: "User successfully created"});

  } catch (error) {
    res.status(500).send({message: "Error while creating User"});
}
});


// app.post("/addtopfive", async (req, res) => {
//   try{
//     const topFiveToAdd = req.body;
//     console.log(topFiveToAdd);
//     const addedTopFive = await TopFive.create(topFiveToAdd);
//     res.status(201).send({"message": "TopFive added successfully to DB"});
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({"message": "Error while adding TopFive to DB"});
//   }
// });