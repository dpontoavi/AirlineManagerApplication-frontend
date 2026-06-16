# Airline Manager Application — Frontend

React frontend for the Airline Manager Application. Connects to the [backend](https://github.com/dpontoavi/FlightManagerApplication-backend) to display and manage flights and boarding passes.

### Summary

- [Features](#features)
- [How to run locally](#run)
- [Connecting to the backend](#connect)
- [Project Structure](#structure)

---

# <a id="features">Features</a>

- View all flights and boarding passes without authentication
- Admin login via randomized URL for security
- Create, delete and manage flights when authenticated
- Generate boarding passes from existing flights
- Cancel boarding passes
- Glass morphism UI with responsive layout

---

# <a id="run">How to run locally</a>

### Requirements

- Node.js 18+
- npm
- git

### 1. Clone the repository

```bash
git clone https://github.com/dpontoavi/AirlineManagerApplication-frontend.git
cd AirlineManagerApplication-frontend
cd flightstudy-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Check if the API_BASE is correct at `/src/api/client.ts`

```TypeScript
  const API_BASE = 'http://localhost:8080' //this is the backend link
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

# <a id="connect">Connecting to the backend</a>

Make sure the backend is running before starting the frontend.
Refer to the [backend repository](https://github.com/dpontoavi/FlightManagerApplication-backend) for setup instructions.

### Admin access

1. Start the backend and copy the admin URL from the server console:
```
INFO - Admin panel available at: </auth/xxxxxxxxxxxxxxxx> <-- copy starting from /auth
```

2. Navigate to `localhost:5153/admin` in the frontend
3. Paste the URL, enter your env credentials of the backend and log in
4. Admin buttons (create, delete, generate boarding pass) will appear after login

Tokens expire after **1 hour** — log in again to refresh.
If after refreshing the admin login panel is still "authenticated" simply close the tab and reopen

---

# <a id="structure">Project Structure</a>

```
src/
├── api/                 ← API client and request functions
│   ├── client.ts        ← Axios instance and auth token management
│   ├── flights.ts       ← Flight API calls
│   └── boardingPasses.ts← Boarding pass API calls
├── components/          ← Reusable components
│   └── NewFlightModal.tsx
├── pages/               ← Application pages
│   ├── HomePage.tsx     ← Main page with flights and boarding passes
│   ├── FlightsPage.tsx  ← Flight listing and management
│   ├── BoardingPassesPage.tsx
│   └── AdminPage.tsx    ← Admin login
├── types/               ← TypeScript interfaces
│   └── index.ts
└── App.tsx              ← Route definitions
```

---
# Considerations

As per the [backend](https://github.com/dpontoavi/FlightManagerApplication-backend), the flight is assigned exclusively to a single passenger, this could lead to severe problems when using this frontend. Remember that this is a **studying tool** made for myself and my girlfriend and not solely intended for flight simulation! I'll consider releasing a version that creates only the flight and the ability to assign multiple passengers.

### Tech Stack

- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Axios](https://axios-http.com)
- [React Router v6](https://reactrouter.com)