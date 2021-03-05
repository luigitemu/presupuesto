import { types } from '../types/types';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/firebase-config';
import { loadProjects } from '../helper/loadProjects';

export const startLoadingProjects = () => {


    return async (dispatch) => {

        const projects = await loadProjects();
        dispatch(setProjects(projects));
    }
}

const setProjects = (projects) => ({
    type: types.proyectoLoad,
    payload: projects
})






export const startAddNewProject = (title, presupuestoInicial) => {
    return async (dispatch) => {
        const newProject = {
            title,
            presupuestoInicial,
            total: 0
        }

        const doc = await db.collection('proyectos').add(newProject)

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


    return async (dispatch) => {
        await db.doc(`proyectos/${id}`).delete();
        dispatch(deleteProject(id));
    }
}

const deleteProject = (id) => ({
    type: types.proyectoDelete,
    payload: id
});




export const startAddingNewItem = () => {

    return (dispatch, getState) => {
        const { activeProject } = getState().proyecto;
        const newItem = {
            key: uuidv4(),
            item: 'Item',
            quantity: 0,
            unityPrice: 0,
        }
        const newItems = [newItem, ...activeProject.items];
        const newActive = {
            ...activeProject,
            items: newItems
        }
        console.log('llega Aqui');
        dispatch(addNewItemActiveProject(newActive));



    }

}

const addNewItemActiveProject = (newActive) => ({
    type: types.itemAdd,
    payload: newActive
})


//  NO funciona >:( 
export const startEditingProject = (id, project) => {

    return async (dispatch) => {

        await db.doc(`proyectos/${id}`).update(project);
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

    return async (dispatch) => {

        const project = await db.doc(`proyectos/${id}`).get();
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