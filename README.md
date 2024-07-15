# RAXEL API BOILERPLATE SETUP

This is an organized Express backend server for RESTful Web Services.

## Features

-   Easy deployment.
-   Logging.
-   Well-organized responsibilities principles.
-   Security utilities (password hashing, password generation, UUID generation, etc.).
-   Formatting utilities.
-   JSON Web Token.
-   Sending Emails.

## Stack

-   **MongoDB** as the main NoSQL database.
-   **Express.js** as the backend framework.
-   **JWT** for authentication purposes.
-   **Nodemailer** for handling emails.

## How to run

### Development Mode

```bash
npm run dev
```

This command will delete the current `dist` folder (if it exists) and compile the TypeScript code from `src` to build a new `dist` folder with every change you make without executing any additional command.

### Create a Build

```bash
npm run build
```

This command will transpile the current TypeScript code from `src` and creates a fresh `dist` folder.

### Run in Production Mode

```bash
npm run start
```

If you have your ``dist` folder ready, you can execute this command to run the proyect in production mode. (Make sure you have the NODE_ENV var set in PRODUCTION).

### If `npm run dev` fails.

In this case, you must open two terminals or command lines and do the following:

-   Terminal 1: Execute `npm run w-ts` (this is the tsc watcher).
-   Terminal 2: Execute `npm run w-node` (this is the nodemon watcher).

## Environment Vars

| VAR                         | Description                            | Example                                                                                                | Optional                      |
| --------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------- |
| TZ                          | Custom TimeZone                        | GMT-3                                                                                                  | true                          |
| NODE_ENV                    | Node.js Environment Mode               | DEVELOPMENT                                                                                            | true                          |
| NAME                        | Your backend custom name               | The best backend                                                                                       | true                          |
| HOST                        | Server hostname or IP address          | 192.168.0.1                                                                                            | true, defaults to `localhost` |
| PORT                        | Port number for the server             | 5000                                                                                                   | true, defaults to `3000`      |
| MAINDB_MONGO_URI            | MongoDB connection string              | mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority&appName=AppName | true                          |
| NODEMAILER_SERVICE_NAME     | Email service provider for Nodemailer  | gmail                                                                                                  | true                          |
| NODEMAILER_SERVICE_USERNAME | Username for the email service         | my.email@gmail.com                                                                                     | true                          |
| NODEMAILER_SERVICE_PASSWORD | Password for the email service         | your_email_secret_password                                                                             | true                          |
| NODEMAILER_PROVIDER_ADDRESS | Email address to be used as the sender | my.email.sender@gmail.com                                                                              | true                          |
| JWT_SECRET                  | Secret key for signing JWT tokens      | my_super_secret                                                                                        | true                          |
| JWT_EXPIRES_IN              | Expiration time for JWT tokens         | 30d                                                                                                    | true                          |

If you don't use environment variables, the server will load some default values, excluding all related to MongoDB, Nodemailer, and JWT.
