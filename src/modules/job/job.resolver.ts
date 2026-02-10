import {Request, Response, NextFunction} from 'express';
import jobService from './job.service';
import { jobSchema } from './job.validation';

class jobResolver {
    async createJob(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if(!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const validatedJobData = jobSchema.parse(req.body);

            const job = await jobService.createJob( { ...validatedJobData, userId });
            return res.status(201).json(job);
        } catch (error) {
            next(error);
        }
    }

    async getJobById(req: Request, res: Response, next: NextFunction) {
        try {
            const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const job = await jobService.getJobById(jobId);
            return res.status(200).json(job);
        } catch (error) {
            next(error);
        }
    }

    async updateJob(req: Request, res: Response, next: NextFunction) {
        try {
            const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            const updatedData = jobSchema.partial().parse(req.body);
            const updatedJob = await jobService.updateJob(jobId, updatedData);
            return res.status(200).json(updatedJob);
        } catch (error) {
            next(error);
        }
    }

    async getAllJobsByUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if(!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const jobs = await jobService.getAllJobsByUser(userId);
            return res.status(200).json(jobs);
        } catch (error) {
            next(error);
        }
    }

    async deleteJobById(req: Request, res: Response, next: NextFunction) {
        try {
            const jobId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
            await jobService.deleteJobById(jobId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new jobResolver();