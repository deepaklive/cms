# Content Management System

This project is a full-stack Content Management System (CMS) featuring a Django DRF backend and an Angular frontend. Follow the instructions below to set up and run the project locally.

---

## Prerequisites

Ensure the following are installed on your system:

- **Backend Requirements:**
  - Python 3.9 or higher
  - pip (Python package manager)

- **Frontend Requirements:**
  - Node.js 16 or higher
  - Angular CLI (version 13 or higher)

- **Development Tools:**
  - Git for version control
  - A code editor like VS Code or PyCharm

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

Replace `<repository-url>` with the Git repository URL and `<repository-directory>` with the appropriate folder name.

---

## Backend Setup (Django DRF)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Set Up a Virtual Environment

```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

```bash
python manage.py migrate
```

### 5. Create a Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6. Run the Development Server

```bash
python manage.py runserver
```

The backend API will be accessible at `http://127.0.0.1:8000/`.

---

## Frontend Setup (Angular)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
ng serve
```

The frontend application will be accessible at `http://localhost:4200/`.

---

## Environment Configuration

### Backend Environment Variables

- Ensure proper configurations in `settings.py` or via an `.env` file.
- Key settings include `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, and `DATABASES`.

### Frontend Environment Variables

- Configure environment variables in `src/environments/environment.ts`.
- Ensure the backend API URL matches your local or production server.

---

## Additional Notes

- **API Testing:** Use tools like Postman or cURL to test the API endpoints.
- **CORS:** Verify CORS settings in `settings.py` during development.
- **Production Setup:**
  - Use HTTPS for secure communication.
  - Replace SQLite with a production-ready database like PostgreSQL.
  - Serve static files and media using appropriate services (e.g., AWS S3, NGINX).
- **Deployment:** Follow best practices for deploying Django and Angular applications on servers like AWS, Azure, or Heroku.

---

## Project Features

### Backend (Django DRF):
- User authentication with token-based security.
- CRUD operations for content management.
- Role-based permissions (Admin, Editor, Viewer).

### Frontend (Angular):
- Responsive UI with Angular Material.
- Secure communication with backend APIs.
- Content listing, creation, editing, and deletion.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
