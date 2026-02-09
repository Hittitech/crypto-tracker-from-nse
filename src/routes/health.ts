import { Router, Request, Response } from "express";

const router = Router();

router.get("/heartbeat", (_req: Request, res: Response) => {
  res.json({
    status: "alive from birth till death",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong me" });
});

export default router;
