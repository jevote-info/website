import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  res.clearPreviewData();
  res.redirect('/');
};

export default handler;
