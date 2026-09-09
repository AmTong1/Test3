# Employee Management Web App

ระบบจัดการข้อมูลพนักงาน — Web Application (Node.js + MySQL)

## โครงสร้างโปรเจค

```
employee_app/
├── backend/
│   ├── server.js          # Express REST API
│   ├── .env               # ตั้งค่า MySQL
│   ├── employee_db.sql    # Script สร้าง Database
│   └── package.json
├── frontend/
│   ├── index.html         # หน้าฟอร์มหลัก
│   ├── style.css          # สไตล์
│   └── app.js             # Logic CRUD
├── run_backend.bat        # รัน Backend
├── run_frontend.bat       # เปิด Frontend
└── run_app.bat            # รันทั้งสอง
```

## ความต้องการ

- [Node.js](https://nodejs.org/) v18+
- MySQL Server (XAMPP / MariaDB / MySQL Community)

## การติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
cd backend
npm install
```

### 2. ตั้งค่า MySQL

แก้ไขไฟล์ `backend/.env`:

```env
PORT=5000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=employee_db
```

### 3. การรัน Backend

```bash
cd backend
node server.js
```

### 4. การรัน Frontend

```bash
start frontend/index.html
```
