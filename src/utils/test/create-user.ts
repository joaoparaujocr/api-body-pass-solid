import { FastifyInstance } from "fastify";
import request from "supertest"

export async function createUserAndAuthentication(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "João",
    email: "test8@email.com",
    password: "123456"
  })

  const response = await request(app.server).post("/sessions").send({
    email: "test8@email.com",
    password: "123456"
  })

  return { response }
}