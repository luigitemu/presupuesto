import { db } from '../firebase/firebase-config';



export const loadProjects = async (uid) => {
    const projectSnap = await db.collection(`${uid}/Esctritorio/proyectos`).get();
    const projects = [];

    projectSnap.forEach(project => {
        projects.push({
            id: project.id,
            ...project.data()
        });
    });

    return projects;
}