import { describe, it, beforeAll, afterAll, expect } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import { prisma } from "@/lib/prisma"

describe("Checkins - metrics (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be possible to return the checkin count", async () => {
    const { response: { body: { token } } } = await createUserAndAuthentication(app)

    const { body: user } = await request(app.server).get("/me").send().set("Authorization", `Bearer ${token}`)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript academy',
        latitude: -3.105164,
        longitude: -60.033812
      },
    })

    await prisma.checkIn.createMany({
      data: [{
        gym_id: gym.id,
        user_id: user.id
      }, {
        gym_id: gym.id,
        user_id: user.id
      }]
    })

    const { body: { count } } = await request(app.server).get("/checkins/metrics").send().set("Authorization", `Bearer ${token}`)

    expect(count).toBe(2)
  })
})