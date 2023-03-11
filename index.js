const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(require("./routes/users.route"));
app.use(require("./routes/todos.route"));

const { PORT, MONGO_SERVER } = process.env;

mongoose.set('strictQuery', false);

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_SERVER);

    app.listen(PORT, () => {
      console.log(`Успешное соединение. Порт: ${PORT}`);
    });
  } catch (error) {
    console.log(`Ошибка при подключении: ${error.toString()}`);
  }
};

connectAndStartServer();
