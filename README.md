# Mango-Delivery-App
E-commerce WebApp

## Backend database

The Django backend is now configured for PostgreSQL.

1. Install backend dependencies:
```powershell
pip install -r backend/requirements.txt
```
2. Create a PostgreSQL database and copy `backend/.env.example` values into your environment.
3. Export the variables before running Django, for example in PowerShell:
```powershell
$env:POSTGRES_DB="mango_delivery"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="your_password_here"
$env:POSTGRES_HOST="localhost"
$env:POSTGRES_PORT="5432"
```
4. Run migrations:
```powershell
cd backend
python manage.py migrate
```
