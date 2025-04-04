import express from "express";
import cors from "cors";
import 'dotenv/config';
const app = express();
const port = process.env.PORT_SERVER;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
