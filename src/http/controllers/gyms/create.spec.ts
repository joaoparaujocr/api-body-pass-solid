import { describe, it, beforeAll, afterAll, expect } from "vitest"
import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import request from "supertest"

describe("Gyms - create (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be possible to create an academy", async () => {
    const { response: { body: { token } } } = await createUserAndAuthentication(app)

    const response = await request(app.server).post("/gyms").send({
      title: 'Javascript academy',
      latitude: -3.100634,
      longitude: -60.0653841,
    }).set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toBe(201)
  })
})