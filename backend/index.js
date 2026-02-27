//server setup
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDb from "./utils/db.js";

// import routes
import userRoute from "./routes/userroutes.js"
import companyRoute from "./routes/companyroutes.js"
import jobRoute from "./routes/jobroutes.js"
import applicationRoute from "./routes/applicationroutes.js"





// Load environment variables from .env file
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173','https://jobtribe.onrender.com'],
    credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true,
    });
});

// Set PORT from environment variables
const PORT = process.env.PORT || 3000;
// setup apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
// "http://localhost:800/api/v1/user/register"




app.listen(PORT, () => {
    //connecting db
    connectMongoDb();
    console.log(`Server running at Port ${PORT}`);
});
