import express from "express";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { authMiddleware } from "./auth.js";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const router = express.Router();

router.get("/:deckId", async (req, res) => {
  try {
    const cards = await prisma.card.findMany({
      where: {
        deckId: parseInt(req.params.deckId),
      },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const { front, back, deckId } = req.body;

    if (typeof front !== "string" || front.trim() === "") {
      return res.status(400).json({
        error: "Front is required!",
      });
    }

    const card = await prisma.card.create({
      data: {
        front,
        back,
        deck: {
          connect: { id: deckId },
        },
      },
    });

    res.status(201).json(card);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.put("/:id", async (req, res) => {
  const card = await prisma.card.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: { deck: true },
  });

  if (!card || card.deck.userId !== req.user.userId) {
    return res.status(403).json({ error: "Not authorized!" });
  }

  const { front, back, deckId } = req.body;

  if (typeof front !== "string" || front.trim() === "") {
    return res.status(400).json({
      error: "Front is required!",
    });
  }

  const id = parseInt(req.params.id);
  try {
    const card = await prisma.card.update({
      where: { id },
      data: {
        front,
        back,
        deckId,
      },
    });

    res.json(card);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Card not found",
      });
    }

    console.log(error);
    return res.status(500).json({
      error: "Failed to update card",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const card = await prisma.card.findUnique({
    where: { id },
    include: { deck: true },
  });

  if (!card || card.deck.userId !== req.user.userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  try {
    await prisma.card.delete({
      where: { id },
    });

    res.status(204).json({ message: "Card deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        error: "Card not found",
      });
    }
    return res.status(500).json({
      error: "Failed to delete card",
    });
  }
});

export default router;
