# Dockerfile

# Use node alpine as it's a small node image
FROM node:alpine

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package.json /app
COPY yarn.lock /app
COPY prisma /app

# Install dependencies in /app
RUN yarn install
RUN yarn prisma:generate

# Copy the rest of our Next.js folder into /app
COPY . /app

# Ensure port 3000 is accessible to our system
EXPOSE 3000

ENV DATABASE_URL=postgresql://jevote:jevote@postgres:5432/jevote?schema=public
ENV PREVIEW_SECRET=verysecret

# Run yarn dev, as we would via the command line 
CMD ["yarn", "dev"]