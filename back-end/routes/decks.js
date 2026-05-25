import express from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { authMiddleware } from "./auth.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
const router = express.Router();

router.get("/public", async (req, res) => {
  try {
    const decks = await prisma.deck.findMany({
      where: {
        isPublic: true,
      },
    });
    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { title, isPublic } = req.body;
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const deck = await prisma.deck.create({
      data: {
        title,
        isPublic: isPublic ?? false,
        user: {
          connect: { id: req.user.userId },
        },
      },
    });
    res.status(201).json(deck);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
router.get("/", async (req, res) => {
  try {
    const decks = await prisma.deck.findMany({
      where: {
        userId: req.user.userId,
      },
    });
    res.json(decks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deck = await prisma.deck.findUnique({
      where: { id },
    });
    if (!deck || deck.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await prisma.deck.delete({
      where: { id },
    });
    res.status(204).json({ message: "Deck deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Deck not found" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, isPublic } = req.body;
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const deck = await prisma.deck.findUnique({ where: { id } });
    if (!deck || deck.userId !== req.user.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }
    const updated = await prisma.deck.update({
      where: { id },
      data: { title, isPublic },
    });
    res.json(updated);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Deck not found" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
