import sequelize from "../config/database"; 
import User from "./user";
import Profile from "./profile";
import Job from "./job";
import Skill from "./skills";
import Application from "./application";
import JobSkill from "./jobSkill";
import ApplicationSkill from "./applicationSkill";
import UserSkill from "./userSkills";





// USERS

User.hasOne(Profile, {
  foreignKey: "userId",
  as: "profile",
});

Profile.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});


// EMPLOYER → JOBS

User.hasMany(Job, {
  foreignKey: "userId",
  as: "postedJobs",
});

Job.belongsTo(User, {
  foreignKey: "userId",
  as: "employer",
});


// USER → APPLICATIONS (CANDIDATE)

User.hasMany(Application, {
  foreignKey: "userId",
  as: "applications",
});

Application.belongsTo(User, {
  foreignKey: "userId",
  as: "candidate",
});


// JOB → APPLICATIONS

Job.hasMany(Application, {
  foreignKey: "jobId",
  as: "applications",
});

Application.belongsTo(Job, {
  foreignKey: "jobId",
  as: "job",
});

// junction tables for many-to-many relationships
Job.belongsToMany(Skill, {
  through: JobSkill,
  foreignKey: "jobId",
  as: "skills",
});

Skill.belongsToMany(Job, {
  through: JobSkill,
  foreignKey: "skillId",
  as: "jobs",
});


Application.belongsToMany(Skill, {
  through: ApplicationSkill,
  foreignKey: "applicationId",
  as: "skills",
});

Skill.belongsToMany(Application, {
  through: ApplicationSkill,
  foreignKey: "skillId",
  as: "applications",
});


User.belongsToMany(Skill, {
  through: UserSkill,
  foreignKey: "userId",
  as: "skills",
});

Skill.belongsToMany(User, {
  through: UserSkill,
  foreignKey: "skillId",
  as: "users",
});




const db = {
    sequelize,
    User,
    Profile,
    Job,
    Skill,    
    Application,
    JobSkill,
    ApplicationSkill
};

export default db;
