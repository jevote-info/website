import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid preview secret' });
  }

  res.setPreviewData({}, { maxAge: 60 * 60 });
  res.redirect('/');
};

export default withSentry(handler);
