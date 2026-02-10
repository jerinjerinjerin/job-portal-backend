import db from "../../models";
import { CreateProfilePayload } from "../../types/types";
import { ProfileInput } from "./profile.validation";

const { Profile, User } = db;


class ProfileRepo {
    async createProfile(profileData: CreateProfilePayload) {
        const profile = await Profile.create(profileData);

        return this.getProfileByUserId(profileData.userId);
    }

    async getProfileByUserId(userId: string) {

        const profile = await Profile.findOne({
            where: { userId },
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: {exclude: ["password"]}
                }
            ]
        })

        return profile;
    }

    async updateProfile(userId: string, updatedData: Partial<ProfileInput>) {
        await Profile.update(updatedData, {
            where: { userId }
        })

        return await this.getProfileByUserId(userId);
    }

    async deleteProfileByUserId(userId: string) {
        const deleted = await Profile.destroy({
            where: { userId }
        })

        return deleted
    }
}

export default new ProfileRepo();

