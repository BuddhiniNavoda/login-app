# Tuga Login App

A React login screen with Firebase Authentication. Users can sign in with a Gmail address and password or with Google. After a successful login, the app shows the access token.

Live site: [https://login-assessment-55791.web.app](https://login-assessment-55791.web.app)

## Features

- Gmail + password login (and register)
- Google sign-in popup
- Validation for Gmail format and password length (minimum 6 characters)
- Signed-in page that displays the Firebase access token
- Firebase Hosting for the production build

## Tech stack

- React 19 + TypeScript + Vite
- MUI
- Firebase Auth
- React Router

## Getting started

```bash
cd login-app
npm install
```

Copy the env example and keep the Firebase keys:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Start the app:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Firebase console

In project `login-assessment-55791`, enable these sign-in methods:

1. [Authentication → Sign-in method](https://console.firebase.google.com/project/login-assessment-55791/authentication/providers)
2. Enable **Google**
3. Enable **Email/Password**

Add these authorized domains:

- `localhost`
- `login-assessment-55791.web.app`
- `login-assessment-55791.firebaseapp.com`

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite server |
| `npm run build` | Typecheck and create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Deploy

```bash
npm run build
firebase login
firebase use login-assessment-55791
firebase deploy --only hosting
```

The hosted URL is `https://login-assessment-55791.web.app`.

## App routes

| Path | Page |
| --- | --- |
| `/` | Login |
| `/token` | Access token after sign-in |
