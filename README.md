# BloodConnect: Intelligent Blood Donation & Inventory Management System

BloodConnect is a full-stack, comprehensive web application designed to bridge the gap between blood donors, recipients, and blood banks. The system facilitates seamless blood donation management, ensuring that requested blood types and units can be efficiently tracked, logged, and distributed.

## 🚀 Features

- **User Authentication**: Secure registration and login for both regular users and blood donors. User profiles and management.
- **Donor Management**: Registered users can sign up as Donors, updating their blood group, location, and contact information.
- **Blood Requisition**: Users/Hospitals can raise requests for specific blood groups with urgency tags.
- **Donation Tracking**: Admins/Blood banks can log successful donations that instantly update the real-time blood inventory.
- **Inventory Management**: Maintain an accurate, up-to-date record of available blood units categorized by blood groups.

## 💻 Tech Stack

- **Frontend Environment:**
  - React 19 (Bootstrapped with Vite)
  - React Router DOM for routing and navigation
  - Axios for remote REST API communications

- **Backend Environment:**
  - Java 17
  - Spring Boot 3.5.5
  - Spring Data JPA for ORM (Object-Relational Mapping)
  - MySQL Database

## 📁 Project Structure

The repository is structured into two main directories:

- `/blood_donation-backend`: Contains the complete Spring Boot REST API code.
- `/blood_donation_frontend`: Contains the Vite-based React frontend code.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- **Java 17** Development Kit (JDK)
- **Node.js** (v18 or higher) & **npm**
- **MySQL Server** (Running locally or hosted)

## ⚙️ Getting Started

### 1. Database Setup

Create a new MySQL database named `blood_donation_db` (or as configured in your Spring Boot properties).

### 2. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd blood_donation-backend
   ```
2. Update your `src/main/resources/application.properties` (or `application.yml`) with your MySQL credentials (username and password) and configure the server port (default 8080 or port 8081 if configured otherwise).
3. Run the Spring Boot application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(On Windows, use `mvnw.cmd spring-boot:run`)*

### 3. Frontend Setup (React)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd blood_donation_frontend
   ```
2. Install the necessary Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints Overview

The backend exposes several core REST endpoints (generally prefixed with `/api`):
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Authenticate a user
- `POST /donors` - Register a user as a blood donor
- `GET /donors` - List all available donors
- `POST /requests` - Create a new blood request
- `POST /donations` - Record a successful donation event

*(Please refer to the source controllers: `AuthController`, `DonorController`, `RequestController`, `DonationController` for complete route details).*

## 📄 License

This project is licensed under the MIT License.
