import { application, Request, Response, Router } from "express";
import protect from "../middleware/protect";
import prisma from "../lib/prisma";
import { ApplicationSchema } from "../schemas/application";
import { InterviewRoundSchema } from "../schemas/interviewRound";

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
      .json({ message: "Application created", createdApplication });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Application not created" });
  }
});

router.delete("/:id", protect, async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id as string;
    if (!req.userId) {
      res.status(401).json({ error: "Not authorized" });
      return;
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }

    if (application.userId !== req.userId) {
      res.status(403).json({
        error: "Application can only be deleted by the authorised user",
      });
      return;
    }

    await prisma.application.delete({
      where: { id: applicationId },
    });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Application not deleted" });
  }
});

router.patch("/:id", protect, async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id as string;
    if (!req.userId) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    if (application.userId !== req.userId) {
      res.status(403).json({
        error: "Application can only be updated by the authorized user",
      });
      return;
    }
    const partialApplication = ApplicationSchema.partial().safeParse(req.body);

    if (!partialApplication.success) {
      res
        .status(400)
        .json({ error: partialApplication.error.flatten().fieldErrors });
      return;
    }
    const updatedApplication = await prisma.application.update({
      where: { id: applicationId },
      data: partialApplication.data,
    });
    res.status(200).json(updatedApplication);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Application patch failed" });
  }
});

router.get("/:id", protect, async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id as string;
    if (!req.userId) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!application) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    if (application.userId !== req.userId) {
      res.status(403).json({
        error: "Application can only be viewed by the authorized user",
      });
      return;
    }
    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Cannot get the required application" });
  }
});

router.get("/:id/rounds", protect, async (req: Request, res: Response) => {
  try {
    const applicationId = req.params.id as string;
    if (!req.userId) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }
    const parentApplication = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!parentApplication) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    if (req.userId !== parentApplication.userId) {
      res
        .status(403)
        .json({
          error: "Application can only be viewed by the authorised user",
        });
      return;
    }
    const interviewRounds = await prisma.interviewRound.findMany({
      where: { applicationId },
    });
    res.status(200).json(interviewRounds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not get interview rounds" });
  }
});

router.post("/:id/rounds", protect, async (req: Request, res: Response) => {
  try {
    const parsed = InterviewRoundSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten().fieldErrors });
      return;
    }
    const applicationId = req.params.id as string;
    if (!req.userId) {
      res.status(401).json({ error: "Not Authorized" });
      return;
    }
    const parentApplication = await prisma.application.findUnique({
      where: { id: applicationId },
    });
    if (!parentApplication) {
      res.status(404).json({ error: "Application not found" });
      return;
    }
    if (parentApplication.userId !== req.userId) {
      res.status(403).json({
        error: "Application can only be viewed by the authorized user",
      });
      return;
    }

    const createdInterviewRound = await prisma.interviewRound.create({
      data: {
        ...parsed.data,
        applicationId: applicationId,
      },
    });
    res.status(201).json(createdInterviewRound);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create interview round" });
  }
});
export default router;
