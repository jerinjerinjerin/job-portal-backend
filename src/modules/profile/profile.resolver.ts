import { Request, Response, NextFunction } from "express";
import { profileSchema } from "./profile.validation";
import profileService from "./profile.service";


class ProfileResolver {
    async createProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const userId = req.user?.id;


            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
            }

            const validatedProfileData = profileSchema.parse(req.body);
            const createdProfile = await profileService.createProfile({ ...validatedProfileData, userId });
            res.status(201).json({
                success: true,
                data: createdProfile,
                message: 'Profile created successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async getProfileByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
            }

            const profile = await profileService.getProfileByUserId(userId);
            res.status(200).json({
                success: true,
                data: profile,
                message: 'Profile retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    async updateProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
            }

            const updatedData = profileSchema.partial().parse(req.body);
            const updatedProfile = await profileService.updateProfile(userId, updatedData);
            res.status(200).json({
                success: true,
                data: updatedProfile,
                message: 'Profile updated successfully'
            });
        } catch (error) {
            next(error);
        }

       
    }

     async deleteProfileByUserId(
        req: Request, res: Response, next: NextFunction
     ) {
         try {
             const userId = req.user?.id;

             if (!userId) {
                 return res.status(400).json({
                     success: false,
                     message: 'User ID is required'
                 });
             }

             await profileService.deleteProfileByUserId(userId);
             res.status(204).json({
                 success: true,
                 message: 'Profile deleted successfully'
             });
         } catch (error) {
             next(error);
         }
     }
}

export default new ProfileResolver();