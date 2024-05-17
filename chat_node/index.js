const express = require("express");
const GenAI = require("./genAi");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

class Server {
  constructor() {
    this.app = express();
    this.genai = new GenAI();
    this.app.use(express.json());
    this.routes();
    this.listen();
  }

  routes() {
    this.app.post("/api/get-response", (req, res) => {
      this.getResponseGenAI(req, res);
    });
  }

  async getResponseGenAI(req, res) {
    try {
      console.log(req.body);
      const question = req.body.question;
      const response = await this.genai.getResponse(question);
      console.log(response);
      res.json({ response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  listen() {
    this.app.listen(PORT, () => {
      console.log(`"Server listening on port ${PORT}"`);
    });
  }
}

new Server();
