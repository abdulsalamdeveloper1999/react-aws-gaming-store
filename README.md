# React AWS Full Stack Project

This repository contains a full-stack application with a React + TypeScript frontend and a Spring Boot (Java) backend, both containerized with Docker and orchestrated using Docker Compose. The backend uses PostgreSQL as its database.

## Project Structure

```
.
├── docker-compose.yml
├── ReadMe.md
├── .vscode/
├── react-aws/           # Frontend (React + TypeScript + Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── ...
└── react-aws-server/    # Backend (Spring Boot + Java)
    ├── src/
    ├── pom.xml
    ├── Dockerfile
    └── ...
```

## Features

- **Frontend:**  
  - Built with React, TypeScript, and Vite.
  - Modern UI for product upload and user product browsing.
  - Image upload with preview.
  - Product form with title, description, price, and quantity.

- **Backend:**  
  - Spring Boot REST API.
  - Health check endpoint at `/api/health`.
  - PostgreSQL database integration.

- **DevOps:**  
  - Dockerized frontend and backend.
  - PostgreSQL container for persistent data.
  - Docker Compose for easy orchestration.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running the Project

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd react-development
   ```

2. **Start all services:**
   ```sh
   docker-compose up --build
   ```

3. **Access the apps:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:8080/api/health](http://localhost:8080/api/health)
   - PostgreSQL: localhost:5432 (user: `myuser`, password: `mypass`, db: `mydb`)

### Development

- **Frontend:**  
  Go to `react-aws/` and use Vite scripts (`npm run dev`, `npm run build`, etc.).
- **Backend:**  
  Go to `react-aws-server/` and use Maven (`./mvnw spring-boot:run`).

## Customization

- Update frontend code in [`react-aws/src`](react-aws/src).
- Update backend code in [`react-aws-server/src`](react-aws-server/src).
- Database credentials can be changed in [`docker-compose.yml`](docker-compose.yml) and [`application.properties`](react-aws-server/src/main/resources/application.properties).

## License

This project is for educational/demo purposes.

---

**Author:** abdulsalamdev
