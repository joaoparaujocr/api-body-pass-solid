import { describe, it, beforeAll, afterAll, expect } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"

describe("Gyms - search (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be possible to search for a gym by name", async () => {
    const { response: responseUser } = await createUserAndAuthentication(app, 'ADMIN')

    const token = responseUser.body.token

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: 'Javascript academy',
      latitude: -3.105164,
      longitude: -60.033812
    })

    await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
      title: 'TypeScript academy',
      latitude: -2.9968359,
      longitude: -59.9840799
    })

    const response = await request(app.server).get("/gyms/search").query({
      query: "Javascript"
    }).set("Authorization", `Bearer ${token}`).send()

    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Javascript academy', })
    ])
  })
})