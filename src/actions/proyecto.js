import { types } from '../types/types';
import { db } from '../firebase/firebase-config';
import { loadProjects } from '../helper/loadProjects';
import { finishLoadingTable, startLoadingTable } from './ui';

export const startLoadingProjects = () => {


    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        dispatch(startLoadingTable());
        const projects = await loadProjects(uid);
        dispatch(finishLoadingTable());
        dispatch(setProjects(projects));
    }
}

const setProjects = (projects) => ({
    type: types.proyectoLoad,
    payload: projects
})






export const startAddNewProject = (title, presupuestoInicial) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const newProject = {
            title,
            presupuestoInicial,
            total: 0
        }

        const doc = await db.collection(`${uid}/Esctritorio/proyectos`).add(newProject)

        dispatch(AddNewProject(doc.id, newProject))
    }

}

const AddNewProject = (id, project) => ({
    type: types.proyectoAdd,
    payload: {
        id,
        ...project
    }
});



export const startDeleteProject = (id) => {


    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/Esctritorio/proyectos/${id}`).delete();
        dispatch(deleteProject(id));
    }
}

const deleteProject = (id) => ({
    type: types.proyectoDelete,
    payload: id
});







//  NO funciona >:( 
export const startEditingProject = (id, project) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/Esctritorio/proyectos/${id}`).update(project);
        dispatch(editProject(id, project));
    }

}


const editProject = (id, project) => ({
    type: types.proyectoEdit,
    payload: {
        id,
        project: {
            id,
            ...project
        }
    }
})


export const startSetActiveProject = (id) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const project = await db.doc(`${uid}/Esctritorio/proyectos/${id}`).get();
        const projectActive = {
            id: project.id,
            ...project.data()
        }
        dispatch(setActiveProject(project.id, projectActive));
    }

}


export const setActiveProject = (id, project) => ({
    type: types.setActiveProject,
    payload: {
        id,
        ...project
    }
});

export const cleanLogout = () => ({ type: types.proyectoCleanLogOut });