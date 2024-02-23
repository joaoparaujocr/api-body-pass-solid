import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import { expect, it, describe, beforeAll, afterAll } from "vitest"

describe("Authenticate (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able possible to authenticate a user", async () => {
    const { response } = await createUserAndAuthentication(app)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})