# **Gear Share — Sport Equipment Rental Platform**

A full-stack web application built as my Final Year Project at UNITEN, designed to simplify the renting and sharing of sports equipment through a modern, user-friendly digital platform.

---

## 🚀 **Tech Stack**

**Frontend:** React.js, Inertia.js, Tailwind CSS
**Backend:** Laravel
**Database:** MySQL
**Tools:** Figma (UI/UX), PHP, JavaScript, REST API, GitHub

---

## 📌 **Project Overview**

Gear Share is a platform that allows users to browse, rent, and manage sports equipment easily.
The system provides real-time equipment availability, secure authentication, booking management, and an admin dashboard for handling inventory and user reports.

This project was developed fully by me — from requirements research to full-stack implementation and testing.

---

## ⭐ **Key Features**

### **User Features**

* Browse and search sports equipment
* View availability & details
* Create bookings and manage rental history
* User authentication and profile management

### **Admin Features**

* Manage equipment listings (CRUD)
* Approve or reject bookings
* Handle user reports and system monitoring
* Dashboard for inventory and usage insights

### **System Features**

* Real-time equipment availability
* Role-based access control
* Responsive UI

---

## 🏗️ **System Architecture**

```
React.js (UI) → Inertia.js → Laravel Controllers  
Laravel Services/Models → MySQL Database
```

* Inertia.js used to bridge backend (Laravel) and frontend (React)
* Tailwind CSS for fast, consistent styling
* Laravel for business logic, authentication, and data management

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gear-share.git
cd gear-share
```

### 2. Install backend dependencies

```bash
composer install
```

### 3. Install frontend dependencies

```bash
npm install
```

### 4. Environment setup

```bash
cp .env.example .env
php artisan key:generate
```

Configure database credentials in `.env`.

### 5. Run migrations

```bash
php artisan migrate
```

### 6. Start development servers

Backend:

```bash
php artisan serve
```

Frontend:

```bash
npm run dev
```

---
