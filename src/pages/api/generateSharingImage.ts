// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from 'crypto';
import fs from 'fs';
import superjson from 'superjson';
import puppeteer from 'puppeteer';
import { stringify as querystringStringify } from 'querystring';
import { Politician } from '@prisma/client';
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SharingVariant } from '../../types/surveyResult';
import { isPoliticiansPodiumArray } from '../../utils/isPoliticiansPodiumArray';
import { isSharingVariant } from '../../utils/isSharingVariant';

const SHARING_PAGE_BASE_URL = `${process.env.BASE_URL}/partage`;

async function generateSharingImageHandler(req: NextApiRequest, res: NextApiResponse<Buffer>) {
  const {
    body: { sharingVariant, politicians },
    method,
  } = req;

  if (!isSharingVariant(sharingVariant) || !isPoliticiansPodiumArray(politicians)) {
    return res.status(400).end(`You must pass valid sharing variants and politicians array`);
  }

  switch (method) {
    case 'POST':
      const imagePath = await screenshotResults(sharingVariant, politicians);
      console.log('reading response from', imagePath);
      const imageBuffer = fs.readFileSync(imagePath);

      res.setHeader('Content-Type', 'image/png').status(200).send(imageBuffer);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

const screenshotResults = async (sharingVariant: SharingVariant, politicians: Politician[]) => {
  const serializedPoliticians = superjson.stringify(politicians.map(({ name }) => ({ name })));
  const queryParams = querystringStringify({ sharingVariant, politicians: serializedPoliticians });
  const sharingUrl = `${SHARING_PAGE_BASE_URL}?${queryParams}`;

  const resultHash = crypto.createHash('sha256').update(sharingUrl).digest('hex');
  const filePath = `./sharingImages/${resultHash}.png`;

  // if already screenshotted, return the existing file
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  console.log('no existing screenshot, generating one', sharingUrl);

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-dev-shm-usage',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-renderer-backgrounding',
      '--disable-setuid-sandbox',
      '--disable-speech-api',
      '--disable-sync',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
    ],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(sharingUrl, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `./sharingImages/${resultHash}.png`,
    fullPage: true,
  });

  await browser.close();

  return filePath;
};

export default withSentry(generateSharingImageHandler);
