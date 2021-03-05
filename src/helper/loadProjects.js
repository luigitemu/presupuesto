import { db } from '../firebase/firebase-config';



export const loadProjects = async () => {
    const projectSnap = await db.collection(`/proyectos`).get();
    const projects = [];

    projectSnap.forEach(project => {
        projects.push({
            id: project.id,
            ...project.data()
        });
    });

    return projects;
}