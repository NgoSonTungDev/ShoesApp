const express = require("express");
const mongoose = require("mongoose");

const connection_string =
  "mongodb+srv://ngosontungdev:ngosontungdev@cluster0.rwtlotx.mongodb.net/test";

////////////////////////////////////////
mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
////////////////////////////////////////

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT || 3000, () => {
  console.log(`server is running on ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("", ProductsRoute);

// mongoose.connect(connection_string, (error) => {
//   if (error) {
//     console.log("Error :" + error);
//   } else {
//     console.log("Connected successfully to server");
//   }
// });
