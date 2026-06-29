import { Request, Response, Router } from "express";
import protect from "../middleware/protect";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", protect, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const applicationsFound = await prisma.application.findMany({
      where: { userId },
    });
    res.json(applicationsFound);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
