import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest"

export async function createUserAndAuthentication(app: FastifyInstance, roleUser: "ADMIN" | "MEMBER" = "MEMBER") {
  await prisma.user.create({
    data: {
      name: "João",
      email: "test8@email.com",
      password_hash: await hash("123456", 6),
      role: roleUser
    }
  })

  const response = await request(app.server).post("/sessions").send({
    email: "test8@email.com",
    password: "123456"
  })

  return { response }
}