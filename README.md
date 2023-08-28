# Worker Discovery App

Lavoro is a worker discovery MERN app designed with ease of use in mind. The app allows signups as users and workers and has the basic functionality to look for workers. The app is particularly suitable for blue-collar workers of India.

## Run Locally

1. Clone the project

```bash
  git clone https://github.com/furqanulaalam/worker-discovery-mern-app.git
```

2. Go to the project directory

```bash
  cd worker-discovery-mern-app
```

3. Install dependencies

Setting up client side

```bash
  cd client
  npm install
```

Setting up server side

```bash
  cd server
  npm install
```

4. Specify these environment variables in server directory in a .env file

&nbsp;&nbsp;&nbsp;&nbsp;ACCESS_TOKEN_SECRET

&nbsp;&nbsp;&nbsp;&nbsp;DB_URL

&nbsp;&nbsp;&nbsp;&nbsp;DEFAULT_IMG_URL (absolute path to db/images/default.png in the server directory).

&nbsp;&nbsp;&nbsp;&nbsp;IMG_URL (absolute path to db/images/ in the server directory).

5. Start backend server from the server directory by running:

```bash
  node app.js
```

6. Start frontend server from the client directory by running:

```bash
  npm start
```

## Thank you!
