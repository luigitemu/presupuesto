import { db } from "../firebase/firebase-config"

export const loadItems = async (uid, id) => {

    const itemSnap = await db.collection(`${uid}/Esctritorio/proyectos/${id}/items`).get();
    const items = [];

    itemSnap.forEach(item => {
        items.push({
            key: item.id,
            ...item.data()
        })
    });

    return items;
}