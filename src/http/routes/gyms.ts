import { FastifyInstance } from "fastify";
import { JWTVerify } from "../middlewares/jwt-verify";
import { create } from "../controllers/gyms/create";
import { search } from "../controllers/gyms/search";
import { nearby } from "../controllers/gyms/nearby";
import { verifyRole } from "../middlewares/verify-role";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", JWTVerify)

  app.post("", { onRequest: [verifyRole('ADMIN')] }, create)
  app.get("/search", search)
  app.get("/nearby", nearby)
}