# NestJS Backend - Demo Gen-AI

Backend base for NestJS, includes:

-   Swagger
-   TypeORM
-   Auth Guard
-   Exception Filter

## Perquisite

Install NodeJS version 20.x.x (lts/iron)

```bash
# Install NodeJS
nvm install lts/iron

# Using NodeJS
nvm use lts/iron
```

Install and upgrade all packages

```bash
# Install all packages
yarn

# Upgrade all packages (optional)
npx yarn-upgrade-all
```

Config AWS Credential profile

```bash
# Open AWS Credential file
code ~/.aws/credentials
```

Add the following content to the file

```text
[quicksight-qa-demo]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET
```

## Setup Environment Variables

Create a `.env` file in the root directory based on the `.env.development` file

```bash
cp .env.development .env
```

> Note: On production, you need to update a `.env.production` file

## Available Scripts

In the project directory, you can run:

### `yarn start:dev`

Runs the app in the development mode.

Server will run on [http://localhost:8000](http://localhost:8000).

Swagger will run on [http://localhost:8000/docs](http://localhost:8000/docs).

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn start`

Runs the app in the production mode.

> Note: You need to build the app before running this command.

## Learn More

You can learn more in the [NestJS documentation](https://docs.nestjs.com).
