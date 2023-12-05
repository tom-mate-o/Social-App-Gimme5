require("dotenv").config(); // Laden von Umgebungsvariablen aus .env

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const Filter = require("bad-words");
const nodemailer = require("nodemailer");

// JSON WEB Token - JWT
const jwt = require("jsonwebtoken");

// Multer Middleware (Images)
const multer = require("multer");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Damit die Bilder aus dem Ordner uploads im Browser angezeigt werden können

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
  comments: [{commentId: String, user: String, timestamp: String, comment: String}],
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
  username: {
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
  likedPostsIds:{
    type: Array,
    default: [],
  }
});

const UserModel = connection.model("usercollection", userSchema); // UserCollection ist der Namer der Collection in der DB

// Methode um TopFive Liste in die DB zu schreiben
app.post("/addtopfive", async (req, res) => {
  try {
    const topFiveToAdd = req.body;
    console.log(topFiveToAdd);
    const addedTopFive = await TopFive.create(topFiveToAdd);
    res.status(201).send({ message: "TopFive added successfully to DB" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while adding TopFive to DB" });
  }
});

// Methode um Comments in die TopFive Liste in der DB zu schreiben

app.post("/api/addcomment", async (req, res) => {
  try {
    const {id, commentId, user, timestamp, comment} = req.body;
    const post = await TopFive.findOneAndUpdate(
      {id: id}, 
      {$push: {comments: 
        {commentId: commentId, user: user, timestamp: timestamp, comment: comment}
      }});
    res.status(201).send({ message: "Comment added successfully to DB" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while adding Comment to DB" });
  }
});



// Methode um  TopFive Listen aus der DB zu lesen

app.get("/gettopfives", async (req, res) => {
  try {
    const getTopFiveLists = await TopFive.find({}); //sucht alle TopFive Listen in der DB nach {} = alle
    console.log(getTopFiveLists);
    res
      .status(200)
      .send({
        message: "TopFive Lists successfully fetched from DB",
        data: getTopFiveLists,
      }); // Send the fetched data
  } catch {
    res
      .status(500)
      .send({ message: "Error while fetching TopFive Lists from DB" });
  }
});

// Methode um eine TopFive Liste aus der DB zu löschen

app.delete("/deletetopfive/:id", async (req, res) => {
  try {
    const topFiveId = req.params.id;
    await TopFive.findOneAndDelete({ id: topFiveId });
    res
      .status(200)
      .send({ message: "TopFive List successfully deleted from DB" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while deleting TopFive List from DB" });
  }
});

app.delete("/deletecomment/:id", async (req, res) => {
  try {
    const topFiveId = req.params.id;
    console.log(topFiveId);
    const commentId = req.body.commentId;
    console.log(commentId);
    await TopFive.findOneAndUpdate(
      { id: topFiveId },
      { $pull: { comments: { commentId: commentId } } }
    );
    res
      .status(200)
      .send({ message: "Comment deleted from DB" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while deleting comment from DB" });
  }
});

// Routen
app.get("/", (req, res) => {
  res.send("Huhu! app.js is here");
});

app.get("/db-status", (req, res) => {
  let state = "Unknown";
  switch (connection.readyState) {
    case 0:
      state = "Disconnected";
      break;
    case 1:
      state = "Connected";
      break;
    case 2:
      state = "Connecting";
      break;
    case 3:
      state = "Disconnecting";
      break;
  }
  res.send(`Database connection state: ${state}`);
});

app.get("/health-check", (req, res) => {
  res.status(200).send({ message: "I'm alive. Greetings from the backend." });
});

app.listen(port, () => {
  console.log(`app.js here - Example app listening on port ${port}`);
});

// POST Login -----------------------------------------------------

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Required field missing" });
  }

  // Error Handling
  // check if user exists in DB
  const existingUser = await UserModel.findOne({ email }); // Model ansprechen über Filter
  if (!existingUser) {
    console.log("User does not exist");
    return res.status(404).send({ message: "User does not exist" });
  }
  // check if password is correct
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.hashedPassword
  );
  if (!isPasswordCorrect) {
    console.log("Password is incorrect");
    return res.status(401).send({ message: "Password is incorrect" });
  }
  if (isPasswordCorrect || existingUser) {
    console.log("Username + PW is correct - Login successful");

    // create JWT-Token
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);
    console.log("token: " + token);

    return res.status(200).send({ token, message: "Login successful" });
  }
});

// PASSWORD RESET ----------------------------------------------

app.post("/api/auth/resetpassword", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    return res.status(400).send({ message: "Required field missing" });
  }
  try {
    const userExists = await UserModel.findOne({ email });
    console.log("userExists = " + userExists.username);
    if (!userExists) {
      return res.status(404).send({ message: "User does not exist" });
    }
    const code = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailMessage = {
      from: process.env.EMAIL,
      to: email,
      subject: "GIMME5 Password Reset",
      text: `Your password reset code is ${code}`,
    };

    transporter.sendMail(mailMessage, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
        const responseData = { code, token, message: "Code sent to email" };
        res.status(200).send(responseData);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error while resetting password" });
  }
});

// PASSWORD UPDATE --------------------------------------------

app.put("/api/auth/reset/newpassword", async (req, res) => {
  const password = req.body.password;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!password || !token) {
    return res.status(400).send({ message: "Required field missing" });
  }

  try{
  const newHashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await UserModel.findOne({ email: decodedToken.email });
  const userSet = await UserModel.findOneAndUpdate({email: decodedToken.email}, {hashedPassword: newHashedPassword});
  res.status(200).send({ message: "Password updated successfully" });

  }catch(error){
    console.log(error);
    return res.status(500).send({ message: "Error while updating password" });
  }
  
});

// Route zum Liken der Posts --------------------------------------------

app.put("/api/:id/likepost", async (req, res) => {
  try {
    // get value from param, header
    const id = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ id: decodedToken.id });

    console.log('token:', token); 
    console.log('decodedToken.id:', decodedToken.id);
    console.log('id:', id);
console.log('user:', user);

    if (!user.likedPostsIds.includes(id)){ // wenn es die PostID noch nicht im Array des Users gibt
      const post = await TopFive.findOneAndUpdate({id: id}, {$inc: {likes: 1}}); // likes um 1 erhöhen

      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }
      // postId dem Array des Users hinzufügen
      user.likedPostsIds.push(id);
      await user.save();
      res.status(200).send({ message: "Post liked successfully" });
    }
    else{
      // Like wieder von Post zurücknehmen
      const post = await TopFive.findOneAndUpdate({id: id}, {$inc: {likes: -1}});
      if (post){
        user.likedPostsIds.pull(id);
        await user.save();
      }
      return res.status(201).send({ message: "Post unliked successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error while liking post" });
  }
});


// POST Register ----------------------------------------------

// Middleware für multipart formdata
app.use(express.urlencoded({ extended: true }));

const filter = new Filter();

app.post("/api/register", avatar.single("avatar"), async (req, res) => {
  try {
    const {
      id,
      avatar,
      username,
      firstname,
      lastname,
      password,
      email,
      location,
      role,
    } = req.body;

    if (!id || !username || !firstname || !password || !email || !role) {
      return res.status(400).send({ message: "Required Field Missing" });
    }

    // Überprüfen ob der Benutzername Hatespeech enthält
    if (filter.isProfane(username)) {
      return res
        .status(406)
        .send({ message: "Username contains inappropriate language" });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(422).send({ message: "E-Mail already exists" });
    }

    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    console.log(avatarUrl);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const userToAdd = new UserModel({
      id,
      avatarUrl,
      username,
      firstname,
      lastname,
      hashedPassword,
      email,
      location,
      role,
    });
    console.log("hi");
    console.log(userToAdd);

    const userCreated = await UserModel.create(userToAdd);
    console.log("creating");
    res.status(201).send({ message: "User successfully created" });
  } catch (error) {
    res.status(500).send({ message: "Error while creating User" });
  }
});

// Methode um UserData aus der DB zu lesen

app.get("/getuserdata", async (req, res) => {
  try {
    const getUserData = await UserModel.find({});
    console.log("user data loaded");
    res
      .status(200)
      .send({
        message: "UserData successfully fetched from DB",
        data: getUserData,
      });
  } catch {
    res
      .status(500)
      .send({ message: "Error while fetching UserData Lists from DB" });
  }
});

// Methode um UserName aus der DB zu lesen

app.get("/getusername", async (req, res) => {
  try {
    const email = req.query.email;
    const getUserData = await UserModel.find({ email: email });
    console.log("user data loaded");
    res
      .status(200)
      .send({
        message: "UserData successfully fetched from DB",
        data: getUserData,
      });
  } catch {
    res
      .status(500)
      .send({ message: "Error while fetching UserData Lists from DB" });
  }
});
