import { describe, it, beforeAll, afterAll, expect } from "vitest"
import request from "supertest"
import { app } from "@/app"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import { prisma } from "@/lib/prisma"

describe("Checkins - validate (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it("should be possible to validate a checkin", async () => {
    const { response: { body: { token } } } = await createUserAndAuthentication(app, 'ADMIN')

    const { body: user } = await request(app.server).get("/me").send().set("Authorization", `Bearer ${token}`)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript academy',
        latitude: -3.105164,
        longitude: -60.033812
      },
    })

    let checkin = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id
      }
    })

    const response = await request(app.server).patch(`/checkins/${checkin.id}`).set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(204)

    checkin = await prisma.checkIn.findUniqueOrThrow({ where: { id: checkin.id } })

    expect(checkin.validated_at).toEqual(expect.any(Date))
  })
})