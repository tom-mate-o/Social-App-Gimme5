require('dotenv').config(); // Laden von Umgebungsvariablen aus .env

const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const Filter = require('bad-words');

// JSON WEB Token - JWT
const jwt = require('jsonwebtoken');

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
    cb(null, `${Date.now()}-${file.originalname}`);
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
    avatarUrl: {
      type: String,
      required: false,
    },
    username:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    lastname: {
      type: String,
      required: false,
    },
    hashedPassword: {
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

  const UserModel = connection.model("usercollection", userSchema); // UserCollection ist der Namer der Collection in der DB


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

// POST Login -----------------------------------------------------

app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).send({message: "Required field missing"});
  }

  // Error Handling
  // check if user exists in DB
  const existingUser = await UserModel.findOne({email}); // Model ansprechen über Filter
  if(!existingUser) {
    console.log("User does not exist");
    return res.status(404).send({message: "User does not exist"});
  }
  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.hashedPassword);
  if(!isPasswordCorrect) {
    console.log("Password is incorrect");
    return res.status(401).send({message: "Password is incorrect"});
  }
    	if (isPasswordCorrect || existingUser) {
    console.log("Username + PW is correct - Login successful");
    
    // create JWT-Token
    const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET);
    console.log("token: " + token);

    return res.status(200).send({token, message: "Login successful"});
      }


});


// POST Register ----------------------------------------------

// Middleware für multipart formdata
app.use(express.urlencoded({ extended: true }));

const filter = new Filter();

app.post("/api/register", avatar.single("avatar"), async (req, res) => { 

  try{
    const {id, avatar, username, firstname, lastname, password, email, location, role} = req.body;
  
    if(! id || !username || !firstname || !password || !email || !role) {
      return res.status(400).send({message: "Required Field Missing"});
    }

    // Überprüfen ob der Benutzername Hatespeech enthält
    if(filter.isProfane(username)) {
      return res.status(406).send({message: "Username contains inappropriate language"});
    }
  
    const existingUser = await UserModel.findOne({username});
    if(existingUser) {
      return res.status(409).send({message: "User already exists"});
    }

    const existingEmail = await UserModel.findOne({email});
    if(existingEmail) {
      return res.status(422).send({message: "E-Mail already exists"});
    }
  
    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log(avatarUrl);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword); 

   const userToAdd = new UserModel({id, avatarUrl, username, firstname, lastname, hashedPassword, email, location, role});
   console.log("hi"); 
   console.log(userToAdd); 

    const userCreated = await UserModel.create(userToAdd);
    console.log("creating");
    res.status(201).send({message: "User successfully created"});

  } catch (error) {
    res.status(500).send({message: "Error while creating User"});
}
});

