**# **JobTribe****

JobTribe is a web application inspired by LinkedIn that connects companies and job seekers. Companies can post job openings, and applicants can apply to those jobs seamlessly. The project includes separate backend and frontend implementations.

---

## **Features**

### **For Companies:**

1. Create, read, update, and delete job postings.
2. Manage applicant information.

### **For Job Seekers:**

1. Browse and search for jobs.
2. Apply to job postings.
3. Manage personal profiles.

---

## **Tech Stack**

### **Frontend:**

- React.js
- Tailwind CSS
- Axios for API requests

### **Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose for database operations

### **Other Tools:**

- Cloudinary for file storage (e.g., profile pictures and job-related documents).

---

## **Setup Instructions**

Follow these steps to set up the JobTribe project on your local system:

### **Prerequisites**

1. Node.js installed on your machine.
2. MongoDB Atlas account or a local MongoDB instance.
3. Cloudinary account for file uploads.

---

### **Steps to Start the Project**

#### **1. Clone the Repository**

```bash
git clone https://github.com/Krishnavardhan23/JOBTRIBE.git
cd JOBTRIBE
```

#### **2. Backend Setup**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `config.env` file in the backend folder with the following variables:
   ```env
   PORT
   connectionURL
   SECRET_KEY
   CLOUD_NAME
   API_KEY
   API_SECRET!!


   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

#### **3. Frontend Setup**

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
#### **4. Access the Application**
- Open your browser and navigate to `http://localhost:PORT`.
---
## **Notes**
1. **Environment Variables**: Ensure the `config.env` file is added to the `backend` folder as it's critical for connecting to the database and managing file uploads.
2. **Security**: Replace sensitive values like the `connectionURL`, `SECRET_KEY`, and Cloudinary credentials with your own before deployment.
3. **Git Ignore**: Ensure the `.env` file is listed in `.gitignore` to avoid exposing sensitive information.
---
![image](https://github.com/user-attachments/assets/5ab94e71-afe7-41d8-94ff-2f5be8dec010)



