import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { paintingValidationSchema } from 'validationSchema/paintings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.painting
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPaintingById();
    case 'PUT':
      return updatePaintingById();
    case 'DELETE':
      return deletePaintingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPaintingById() {
    const data = await prisma.painting.findFirst(convertQueryToPrismaUtil(req.query, 'painting'));
    return res.status(200).json(data);
  }

  async function updatePaintingById() {
    await paintingValidationSchema.validate(req.body);
    const data = await prisma.painting.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePaintingById() {
    const data = await prisma.painting.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
