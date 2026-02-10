import { JobInput } from "../modules/job/job.validation";
import { ProfileInput } from "../modules/profile/profile.validation";

export type CreateProfilePayload = ProfileInput & {
  userId: string;
};

export type CreateJobPayload = JobInput & {
  userId: string;
};
