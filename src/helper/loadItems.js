import { db } from "../firebase/firebase-config"

export const loadItems = async (id) => {

    const itemSnap = await db.collection(`proyectos/${id}/items`).get();
    const items = [];

    itemSnap.forEach(item => {
        items.push({
            key: item.id,
            ...item.data()
        })
    });

    return items;
}