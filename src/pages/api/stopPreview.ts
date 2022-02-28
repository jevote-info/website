import { withSentry } from '@sentry/nextjs';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = (req, res) => {
  res.clearPreviewData();
  res.redirect('/');
};

export default withSentry(handler);
