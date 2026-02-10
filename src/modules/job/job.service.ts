import { CreateJobPayload } from "../../types/types";
import jobRepo from "./job.repo";

class jobService  {
  async createJob( jobData: CreateJobPayload) {
   
    const isEmployee = await jobRepo.isEmployee(jobData.userId);

    if (!isEmployee) {
      throw new Error("Only employers can create jobs");
    }

    return await jobRepo.createJob(jobData.userId, jobData);
  }

  async getJobById(jobId: string) {
    const job = await jobRepo.getJobById(jobId);

    if (!job) {
      throw new Error("Job not found");
    }

    return job;
  }

  async updateJob(jobId: string, updatedData: Partial<CreateJobPayload>) {
    const updatedJob = await jobRepo.updateJob(jobId, updatedData);

    if (!updatedJob) {
      throw new Error("Failed to update job");
    }

    return updatedJob;
  }

  async getAllJobsByUser(userId: string) {
    return await jobRepo.getAllJobsByUser(userId);
  }

  async deleteJobById(jobId: string) {
    const deleted = await jobRepo.deleteJobById(jobId);

    if (!deleted) {
      throw new Error("Failed to delete job");
    }

    return deleted;
  }
}

export default new jobService();