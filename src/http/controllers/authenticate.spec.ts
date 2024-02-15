import { app } from "@/app"
import request from "supertest"
import { expect, it, describe, beforeAll, afterAll } from "vitest"

describe("Authenticate (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able possible to authenticate a user", async () => {
    await request(app.server).post("/users").send({
      name: "João",
      email: "test8@email.com",
      password: "123456"
    })

    const response = await request(app.server).post("/sessions").send({
      email: "test8@email.com",
      password: "123456"
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})