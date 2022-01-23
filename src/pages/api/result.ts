// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default function resultHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    body: { result },
    method,
  } = req;

  switch (method) {
    case 'POST':
      res.status(204);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
