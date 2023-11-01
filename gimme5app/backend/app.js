require('dotenv').config(); // Laden von Umgebungsvariablen aus .env

const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB verbinden
const connectString = process.env.MONGO_DB_CLIENT;

console.log("Connecting to MongoDB...");

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
});

// ---- ursprüngliche Version mit async/await aus der todo-app, funktioniert hier nicht ----

// app.use(async (req, res, next) => { 
//   console.log("Connecting to MongoDB...");
//   try {
//     const connection = await mongoose.createConnection(connectString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//     req.db = connection;
//     next();
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     next(error);
//   }
// });


// Routen
app.get('/', (req, res) => {
  res.send('Huhu! app.js is here');
});

app.get('/db-status', (req, res) => {
  let state = 'Unknown';
  switch(mongoose.connection.readyState) {
    case 0:
      state = 'disconnected';
      break;
    case 1:
      state = 'connected';
      break;
    case 2:
      state = 'connecting';
      break;
    case 3:
      state = 'disconnecting';
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



