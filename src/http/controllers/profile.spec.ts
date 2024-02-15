import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able possible to get profile information", async () => {
    await request(app.server).post("/users").send({
      name: "João",
      email: "test8@email.com",
      password: "123456"
    })

    const responseAuthentication = await request(app.server).post("/sessions").send({
      email: "test8@email.com",
      password: "123456"
    })

    const { token } = responseAuthentication.body

    const responseProfile = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`)

    expect(responseProfile.statusCode).toBe(200)
    expect(responseProfile.body).toEqual(expect.objectContaining({
      email: "test8@email.com",
    }))
  })
})