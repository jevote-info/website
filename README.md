# jevote.info

## Local development

1. Install dependencies

```shell-session
yarn install
```

2. Create .env file

```shell-session
cp .env.example .env
```

2. With local PostgreSQL running, create / migrate / seed db

```shell-session
yarn prisma:update-db-dev
```

```shell-session
yarn prisma:seed
```

3. Start NextJS server

```shell-session
yarn dev
```

4. Access [local website](http://localhost:3000)

5. To visualize / modify DB data

```shell-session
yarn prisma:visualize
```

## Local development with docker

1. Create .env file

```shell-session
cp .env.example .env
```

2. Create image / run container

```shell-session
docker-compose up
```

3. While containers are running, generate DB tables and data

```shell-session
yarn docker:prisma:update-db-dev
```

```shell-session
yarn docker:prisma:seed
```

4. Access [local website](http://localhost:3000)

5. To visualize / modify DB data (only available running locally for now, not from docker so DATABASE_URL in your .env file should match docker postgres URL and your local node_modules should be installed)

```shell-session
yarn prisma:visualize
```

## Preview mode

To see unpublished categories and questions, navigate to `${SERVER_URL}/api/startPreview?secret=${PREVIEW_SECRET}`
where `PREVIEW_SECRET` is either coming from your env variables or .env file.

Preview mode lasts for one hour.

To disable preview mode sooner, navigate to `${SERVER_URL}/api/stopPreview`
