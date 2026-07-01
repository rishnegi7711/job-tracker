import { Request, Response, Router } from "express";
import protect from "../middleware/protect";
import prisma from "../lib/prisma";
import { ApplicationSchema } from "../schemas/application";

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

router.post("/", protect, async (req: Request, res: Response) => {
  try {
    const parsed = ApplicationSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten().fieldErrors });
      return;
    }
    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const createdApplication = await prisma.application.create({
      data: {
        ...parsed.data,
        userId: req.userId,
      },
    });
    res
      .status(201)
      .json({ message: "Application created", userId: req.userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Application not created" });
  }
});
export default router;
