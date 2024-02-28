import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import request from "supertest"
import { it, describe, beforeAll, afterAll, expect } from "vitest"

describe("Gyms - nearby (E2E", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("It should be possible to look for a nearby gym", async () => {
    const { response: responseToken } = await createUserAndAuthentication(app, 'ADMIN')

    const token = responseToken.body.token

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

    const response = await request(app.server).get("/gyms/nearby").query({
      latitude: -2.9968359,
      longitude: -59.9840799
    }).set("Authorization", `Bearer ${token}`).send()

    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'TypeScript academy',
      })
    ])
  })
})