import mongoose from "mongoose";

import config from "../config/database";

class Database {
  constructor() {
    this.connection = mongoose.connect(
        config.url, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    );
    console.log("Conectou ao banco!");
  }
}

export default new Database();