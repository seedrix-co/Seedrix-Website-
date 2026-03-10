This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Email on Vercel

Contact and CTA forms send inquiries via the `/api/send-inquiry` serverless function using [Resend](https://resend.com).

**Required:** In the Vercel project, set:

- **`RESEND_API_KEY`** – Your Resend API key (create at [resend.com](https://resend.com)).

**Optional:**

- **`INQUIRY_RECIPIENT_EMAIL`** – Where to send inquiries (default: `info@seedrix.co`).
- **`RESEND_FROM_EMAIL`** – Sender address, e.g. `"Website <noreply@yourdomain.com>"`. Default: `"Website <onboarding@resend.dev>"` (Resend's test sender).

Add these under **Project → Settings → Environment Variables** in the Vercel dashboard, then redeploy.

For local testing with the API, run `npx vercel dev` so both the app and the serverless function run; `npm run dev` only serves the frontend.
