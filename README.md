# Project Setup

## Development Environment Variables

Create a file named `.env` in the root of the project and add the following environment variables:

```env
PORT=3001
POSTGRES_DB=db-name
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DATABASE_URL="postgresql://postgres:postgres@db-gatla:5432/gatla"
```
## Run Container

To run the app, run the following command on the terminal

```bash
docker compose up --build
```
