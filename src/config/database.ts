import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "mydb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false, // set true for SQL logs
  }
);

export default sequelize;
