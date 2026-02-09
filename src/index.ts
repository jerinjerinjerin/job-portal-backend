import dotenv from "dotenv";
dotenv.config();

import app from "./server";

import sequelize from "./config/database";


const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database connection has been established successfully.");
        await sequelize.sync({ alter: true }); // Sync models with the database

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

startServer();
