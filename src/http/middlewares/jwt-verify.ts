import { AppError } from "@/error/appError";
import { FastifyReply, FastifyRequest } from "fastify";

export async function JWTVerify(req: FastifyRequest) {
  try {
    await req.jwtVerify()
  } catch (error) {
    throw new AppError(401, "Unathorized")
  }
}