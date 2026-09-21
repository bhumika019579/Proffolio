# Security Policy

## Reporting a vulnerability
Please email <your-email> with details. Do not open a public issue.
I will respond within 7 days.

## Authentication
Users log in with GitHub OAuth. The server issues a signed JWT and verifies it on protected routes.

## Secrets
Secrets live in `server/.env`, which is gitignored. `server/.env.example` lists the required variables.