import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import decksRouter from "./routes/decks.js";
import cardsRouter from "./routes/cards.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/decks", decksRouter);
app.use("/cards", cardsRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
