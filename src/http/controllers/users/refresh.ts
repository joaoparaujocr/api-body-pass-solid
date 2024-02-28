import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const { sub, role } = request.user

  const token = await reply.jwtSign({ role }, {
    sign: {
      sub
    }
  })

  const refreshToken = await reply.jwtSign({ role }, {
    sign: {
      sub,
      expiresIn: "7d"
    }
  })

  return reply.setCookie("refreshToken", refreshToken, { httpOnly: true, sameSite: true, secure: true, path: "/" }).send({
    token
  })
}