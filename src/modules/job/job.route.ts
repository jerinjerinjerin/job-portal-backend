import express from "express";

import jobResolver from "./job.resolver";

const jobRouter = express.Router();

jobRouter.post("/create", jobResolver.createJob);
jobRouter.get("/get/:id", jobResolver.getJobById);
jobRouter.put("/update/:id", jobResolver.updateJob);
jobRouter.get("/getall", jobResolver.getAllJobsByUser);
jobRouter.delete("/delete/:id", jobResolver.deleteJobById);

export default jobRouter;
