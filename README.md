# Prisma Bridg EA Quickstart
A quick-start template using Prisma Bridg.

This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`prisma init`](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#init)

## Setup
### 1. Clone repo
```shell
git clone git@github.com:prisma/bridg-ea-quickstart.git
cd bridg-ea-quickstart
```

### 2. Install dependencies
```shell
npm install
```

### 4. Run
```shell
npm run dev
```

You should see an empty chat interface at `http://localhost:3000` 

## Getting setup on the Prisma Data Platform

Prisma Bridg works seamlessly with [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) and [Prisma Pulse](https://www.prisma.io/data-platform/pulse). Let's enable them.

Navigate to your Prisma Data Platform workspace and create a new project. Let's call it, **Prisma Bridg Chat**. This will create a default environment for your project.

Next, we'll enable Accelerate and Pulse for this project.

>If you need a database to complete this setup, you can use our [Railway DB template](https://railway.app/template/pulse-pg) to easily provision a Postgres database.

### 5. Enable Accelerate
- Provide your direct database connection string and select the region nearest your database to enable Accelerate. We'll skip static IP support for demo purposes.
- Once enabled, you can generate your Accelerate API key. You'll note the API Key was generated in the format of a connection string, use this as your DATABASE_URL in your .env file.

```shell
DATABASE_URL=""
```

When replacing your DATABASE_URL with your new Accelerate connection string, you can keep your direct database connection string as `DIRECT_DATABASE_URL` for migration support.

### 6. Migrate Database
- Requires `DIRECT_DATABASE_URL` to be set in your .env file

```shell
npx prisma db push
```

### 7. Enable Pulse
- Navigate to the Pulse tab within your project's production environment (where we just enabled Accelerate)
- Provide your direct database connection string and select the region nearest your database to enable Pulse. We'll use the automatic setup.
- Once enabled, you'll be able to Generate an API Key for Pulse. Add the generated API Key to your .env file

```shell
PULSE_API_KEY=""
```

Great! You've now enabled Prisma Accelerate and Prisma Pulse for your project. Let's add Prisma Bridg to our application

### 8. Add Prisma Bridg
From within your project directory, run the following command to add Prisma Bridg to your project.

```shell
npx bridg-cli init
```

This will do the following for you,
1. Install remaining dependencies
2. Generate the `bridg-server.ts` and `bridg.ts` files for you
3. Deploy your managed Bridg endpoint

You're all set 🚀  Let's see how we can use Prisma Bridg to power our chat application.

### Add Bridg to your application
Navigate to `/src/app/page.tsx`and import Bridg at the top of the file.

```tsx
import bridg from "bridg";
```

Add the following code to the `useEffect` hook in the `Home` function.

```tsx
useEffect(() => {
  (async () => {
    /**
     * Bridg supports any authentication method you want to use.
     * Simply add your authentication logic in bridg-server.ts.
     */
    await bridg.$socket.authenticate({ auth: "some-token" });

    // Fetch any existing message from the database
    await bridg.message.findMany().then((res) => setMessages(res));

    // Let's create a new subscription to capture any new messages
    // @ts-ignore
    const subscription = await bridg.message.subscribe();
    for await (const event of subscription) {
      setEvents((prev) => [...prev, event]);
    }
  })();
}, []);
```

Replace the `<Button />` alert with the following code to send new messages.

```tsx
<Button className="ml-2" onClick={() => bridg.message.create({ data: { body: newMessage } })}>Send</Button>
```

If you try to send a message now you'll get the following error message.
> Unauthorized Bridg query on model: message

This is becuase we have not yet refined our Bridg rules. Navigate to the `prisma/bridg.ts` file and modify the following code.

```ts
message: {
  find: (uid) => true, // udpate this to true, so that we can fetch messages
  update: (uid, data) => false,
  create: (uid, data) => true, // udpate this to true, so that we can create new messages
  delete: (uid) => false,
},
```

Deploy your latest Bridg rules by running the following command.

```shell
  npx bridg-cli deploy
```

If you create a new message now you should see it appear in the chat interface 💬

# Feedback
Let us know if you have any thoughts, questions, or feedback via Discord!
