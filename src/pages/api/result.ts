// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createResult } from '../../services/result';
import { SurveyResult } from '../../types/surveyResult';

export default async function resultHandler(req: NextApiRequest, res: NextApiResponse<void>) {
  const {
    body: { result, uniqueId },
    method,
  } = req;

  switch (method) {
    case 'POST':
      createResult(result as SurveyResult, uniqueId);
      res.status(204).send();
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
