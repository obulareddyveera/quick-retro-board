This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Clone the repo from - 
https://github.com/obulareddyveera/quick-retro-board

Create & setup Planetscale account.
Configure .env constants - 
PLANETSCALE_PRISMA_DATABASE_URL - Planetscale URL
HOST_NAME: with Next.JS to perform API call and inject response as props to the component we need to perform API calls with absolute URL, to build absolute URL application uses HOST_NAME.
JWT_SECRET_KEY: application generates JWT token with passcode combination. In the process of generating token application uses JWT_SECRET_KEY
Deploy the application at Vercel cloud with above environment variables.