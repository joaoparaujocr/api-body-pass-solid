import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createUserAndAuthentication } from "@/utils/test/create-user";

describe("Profile (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able possible to get profile information", async () => {
    const { response } = await createUserAndAuthentication(app)

    const responseProfile = await request(app.server).get("/me").set("Authorization", `Bearer ${response.body.token}`)

    expect(responseProfile.statusCode).toBe(200)
    expect(responseProfile.body).toEqual(expect.objectContaining({
      email: "test8@email.com",
    }))
  })
})