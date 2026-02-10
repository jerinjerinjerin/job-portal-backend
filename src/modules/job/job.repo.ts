import db from '../../models/index';
import { CreateJobPayload } from '../../types/types';

const { Job, Skill, User } = db;

class JobRepo {
    async createJob(userId: string, jobData: CreateJobPayload) {

        const job = await Job.create({ ...jobData, userId });

        return this.getJobById(job.id);

    }

   async isEmployee(userId: string) {
  const user = await User.findByPk(userId);

  if (!user) return false;

  return user.role === "employer";
}

    async getJobById(jobId: string) {
        const job = await Job.findOne({
            where: { id: jobId },
           
        });

        return job;
    }

    async updateJob(jobId: string, updatedData: Partial<CreateJobPayload>) {
        await Job.update(updatedData, {
            where: { id: jobId },
        });

        return await this.getJobById(jobId);
    }

    async getAllJobsByUser(userId: string) {
        const jobs = await Job.findAll({
            where: { userId },
        });
        return jobs;
    }

    async deleteJobById(jobId: string) {
        const deleted = await Job.destroy({
            where: { id: jobId },
        });

        return deleted;
    }
}

export default new JobRepo();