import { AppError } from "@/error/appError";
import { FastifyReply, FastifyRequest } from "fastify";

export function verifyRole(role: "ADMIN" | "MEMBER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.user.role !== role) {
      throw new AppError(401, 'Unathorized')
    }
  }
}