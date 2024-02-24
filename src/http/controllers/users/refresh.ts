import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await reply.jwtSign({}, {
    sign: {
      sub: request.user.sub
    }
  })

  const refreshToken = await reply.jwtSign({}, {
    sign: {
      sub: request.user.sub,
      expiresIn: "7d"
    }
  })

  return reply.setCookie("refreshToken", refreshToken, { httpOnly: true, sameSite: true, secure: true, path: "/" }).send({
    token
  })
}