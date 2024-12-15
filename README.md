# Renacentia Backend Installation Manual

## Prerequisites

- **Required Software**:
  - Node.js (>=16.0.0 recommended)
  - Docker and Docker Compose
  - Git

---

## Installation Steps

### 1. Clone the Repository

1. Open a terminal.
2. Clone the project repository:
   ```bash
   git clone https://github.com/GATLA-Meditations/GATLA-Backend.git
   cd GATLA-Backend

---

### 2. Configure Environment Variables

1. Request the `.env` file from the repository maintainers.
2. Place the `.env` file in the root directory of the project.

---

### 3. Using Docker (Recommended)

1. **Start the Docker services**:
   ```bash
   docker-compose up --build
   ```
   This command will:
   - Set up a PostgreSQL database.
   - Start the backend in development mode.
   - Apply database migrations and seed initial data.

2. The backend will be available at: `http://localhost:3001`.

---

### 4. Manual Setup (Without Docker)

1. **Set up PostgreSQL**:
   Ensure that PostgreSQL is running locally.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Apply Database Migrations**:
   ```bash
   npm run db:apply
   ```

4. **Start the Backend**:
   ```bash
   npm run start:dev
   ```

---

## Troubleshooting

- **Database connection error**:
  - Ensure the database service is running.
  - Verify the environment variables in `.env` (e.g., `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`).

- **Database container fails to start**:
  - Check the logs of the `db-gatla` container:
    ```bash
    docker logs db-gatla
    ```

---

## Useful Commands

- **Stop Docker Containers**:
  ```bash
  docker-compose down
  ```

- **Restart Services (Clean Database)**:
  ```bash
  docker-compose down -v
  docker-compose up --build
  ```

---

## Contact

For questions or support, contact the repository maintainers at [GATLA-Meditations](https://github.com/GATLA-Meditations/GATLA-Backend).
```
