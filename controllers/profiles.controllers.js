import {
    createProfileDB,
    deleteProfileDB,
    findProfile,
    findProfileById,
    updateProfileDB,
} from "../models/profiles.models.js";
import { createOneProjectDB, createProjectDB, deleteProject, findProject, updateProject } from "../models/projects.models.js";
import { getOneUserDB } from "../models/users.models.js";
import { createOneWorkDB, createWorkDB, deleteWork, findWork, updateWork } from "../models/works.models.js";

export const getProfile = async (req, res) => {
    try {
        const { user_id } = req.query;
        const profile = await findProfile({ user_id });
        if (!profile) {
            throw new Error("profile not found");
        }
        const projects = await findProject({ profile_id: profile._id });
        const works = await findWork({ profile_id: profile._id });

        res.status(200).send({
            ...profile,
            projects,
            works,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};

export const createProfile = async (req, res) => {
    const { user_id } = req.query
    const {
        full_name,
        birthday,
        place_of_birth,
        nationality,
        education,
        hobbies,
        goal,
        skill,
        projects,
        works,
    } = req.body;
    try {
        const findUser = await getOneUserDB(user_id);
        if (!findUser) {
            throw new Error("User is not correct!");
        }
        const createdProfile = await createProfileDB({
            user_id,
            full_name,
            birthday,
            place_of_birth,
            nationality,
            education,
            hobbies,
            goal,
            skill,
        });
        projects.forEach(item => {
            item.profile_id = createdProfile._id
        });
        const createdProjects = await createProjectDB(projects)
        works.forEach(item => {
            item.profile_id = createdProfile._id
        });
        const createdWorks = await createWorkDB(works)

        if (createdProfile && createdProjects && createdWorks) {
            res.status(200).send({
                message: "Created",
                data: {
                    ...createdProfile,
                    projects: createdProjects,
                    works: createdWorks,
                },
            });
        }
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    const { profile_id } = req.params;
    const { user_id } = req.query;
    const { projects, works, ...updateBody } = req.body
    try {
        const currentProfile = await findProfileById(profile_id);

        if (!currentProfile) {
            throw new Error("Profile not found");
        }

        if (JSON.parse(JSON.stringify(currentProfile.user_id)) !== user_id) {
            throw new Error("User can not edit this Profile");
        }

        await updateProfileDB(currentProfile._id, updateBody)
        for (let i = 0; i < projects.length; i++) {
            const { id, ...update } = projects[i];
            if (!id) {
                await createOneProjectDB(projects[i]);
            } else {
                await updateProject(id, update);
            }
        }
        for (let i = 0; i < works.length; i++) {
            const { id, ...update } = works[i];
            if (!id) {
                await createOneWorkDB(works[i]);
            } else {
                await updateWork(id, update);
            }
        }

        res.status(201).send({
            data: currentProfile,
            message: "Updated",
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};

export const deleteProfile = async (req, res) => {
    const { profile_id } = req.params;
    try {
        const currentProfile = await findProfileById(profile_id);
        if (!currentProfile) {
            throw new Error("profile not found");
        }
        await deleteProfileDB({ _id: profile_id })
        await deleteProject({ profile_id })
        await deleteWork({ profile_id })
        res.status(200).send({
            message: "Delete success",
            success: true,
        });

    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
};
