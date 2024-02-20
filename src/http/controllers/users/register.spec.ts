import { app } from "@/app"
import request from "supertest"
import { describe, it, beforeAll, afterAll, expect } from "vitest"

describe("Register (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able possible to create a record", async () => {
    const response = await request(app.server).post("/users").send({
      name: "João",
      email: "test8@email.com",
      password: "123456"
    })

    expect(response.statusCode).toBe(201)
  })
})