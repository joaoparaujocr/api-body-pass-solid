import { FastifyInstance } from "fastify";
import { JWTVerify } from "../middlewares/jwt-verify";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", JWTVerify)
}