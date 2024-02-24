import { describe, it, beforeAll, afterAll, expect } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"

describe("Users - refresh token (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be possible to refresh the jwt token", async () => {
    const responseCreateUser = await createUserAndAuthentication(app);

    const cookies = responseCreateUser.response.get("Set-Cookie");

    const responseRefreshToken = await request(app.server).patch("/token/refresh").set("Cookie", cookies).send()

    expect(responseRefreshToken.status).toBe(200)
    expect(responseRefreshToken.body).toEqual(expect.objectContaining({
      token: expect.any(String)
    }))
    expect(responseRefreshToken.get('Set-Cookie')).toEqual([
      expect.stringContaining("refreshToken=")
    ])
  })
})
