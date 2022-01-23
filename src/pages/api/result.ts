// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createResult } from '../../services/result';
import { ResultDto } from '../../types/resultDto';

export default async function resultHandler(req: NextApiRequest, res: NextApiResponse<void>) {
  const {
    body: { result },
    method,
  } = req;

  switch (method) {
    case 'POST':
      await createResult(result as ResultDto);
      res.status(204);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
