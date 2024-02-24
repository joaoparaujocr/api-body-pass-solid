import { app } from "@/app"
import { prisma } from "@/lib/prisma"
import { createUserAndAuthentication } from "@/utils/test/create-user"
import request from "supertest"
import { it, describe, beforeAll, afterAll, expect } from "vitest"

describe("Checkins - Create (E2E)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be possible to create a checkin", async () => {
    const { response: { body: { token } } } = await createUserAndAuthentication(app)

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript gym",
        latitude: -3.100634,
        longitude: -60.0653841,
      }
    })

    const response = await request(app.server).post(`/gyms/${gym.id}/checkins`).send({
      latitude: -3.100634,
      longitude: -60.0653841,
    }).set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(201)
  })
})