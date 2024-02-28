import { FastifyInstance } from "fastify";
import { create } from "../controllers/check-ins/create";
import { history } from "../controllers/check-ins/history";
import { JWTVerify } from "../middlewares/jwt-verify";
import { metrics } from "../controllers/check-ins/metrics";
import { validate } from "../controllers/check-ins/validate";
import { verifyRole } from "../middlewares/verify-role";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", JWTVerify)

  app.post("/gyms/:gymId/checkins", create)
  app.get("/checkins/history", history)
  app.get("/checkins/metrics", metrics)
  app.patch("/checkins/:checkInId", { onRequest: [verifyRole("ADMIN")] }, validate)
}