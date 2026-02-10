import { CreateProfilePayload } from "../../types/types";
import profileRepo from "./profile.repo";
import { ProfileInput } from "./profile.validation";

class ProfileService {

    async createProfile( profileData: CreateProfilePayload) {

         const existing =
    await profileRepo.getProfileByUserId(profileData.userId);

  if (existing) {
    throw new Error("Profile already exists");
  }

        const profile = await profileRepo.createProfile(profileData);

        if(!profile) {
            throw new Error("field to create profile")
        }

        return profile;
    }

    async getProfileByUserId(userId: string) {
        const profile = await profileRepo.getProfileByUserId(userId);

        if(!profile) {
            throw new Error("profile not found")
        }

        return profile;
    }

    async updateProfile(userId: string, updatedData: Partial<ProfileInput>) {
        const updatedProfile = await profileRepo.updateProfile(userId, updatedData);

        if(!updatedProfile) {
            throw new Error("failed to update profile")
        }

        return updatedProfile;
    }

    async deleteProfileByUserId(userId: string) {
        const deleted = await profileRepo.deleteProfileByUserId(userId);

        if(!deleted) {
            throw new Error("failed to delete profile")
        }

        return deleted;
    }
}

export default new ProfileService();