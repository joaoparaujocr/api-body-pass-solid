import { FastifyInstance } from "fastify";
import { JWTVerify } from "../middlewares/jwt-verify";
import { create } from "../controllers/gyms/create";
import { search } from "../controllers/gyms/search";
import { nearby } from "../controllers/gyms/nearby";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", JWTVerify)

  app.post("", create)
  app.post("/search", search)
  app.post("nearby", nearby)
}