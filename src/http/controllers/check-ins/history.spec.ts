import { describe, it, beforeAll, afterAll, expect } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import { prisma } from "@/lib/prisma"

describe("Checkins - history (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be possible to list the user's checkin history", async () => {
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

    const response = await request(app.server).get("/checkins/history").send().set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body.checkins).toHaveLength(2)
    expect(response.body.checkins).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
    ])
  })
})