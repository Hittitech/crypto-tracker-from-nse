import { Router, Request, Response } from "express";

const router = Router();

router.get("/heartbeat", (_req: Request, res: Response) => {
  res.json({
    status: "alive",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

export default router;
