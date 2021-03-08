import { types } from "../types/types";
import { loadItems } from "../helper/loadItems";
import { db } from "../firebase/firebase-config";
import { finishLoadingTable, startLoadingTable } from "./ui";




export const startAddingItem = (id) => {



    return async (dispatch, getState) => {

        const { activeProject } = getState().proyecto;
        const { uid } = getState().auth;
        const newItem = {
            item: 'Item',
            quantity: 0,
            unityPrice: 0,
        }

        const doc = await db.collection(`${uid}/Esctritorio/proyectos/${activeProject.id}/items`).add(newItem);

        // dispatch(startEditingProject(project.id, project));

        dispatch(addNew(doc.id, newItem));
    }
}

const addNew = (id, item) => ({
    type: types.itemAdd,
    payload: {
        key: id,
        ...item
    }
})


export const startLoadingItems = (id) => {


    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeProject } = getState().proyecto;
        dispatch(startLoadingTable());
        const data = await loadItems(uid, activeProject.id);
        dispatch(finishLoadingTable());

        let total = 0;
        if (data !== undefined || data.length > 0) {
            data.forEach(item => {
                total += (item.quantity * item.unityPrice);
            });
        }

        dispatch(setItems(data));
        dispatch(setTotal(total));

    }


}

export const startEditing = (id, item) => {


    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeProject } = getState().proyecto;

        await db.doc(`${uid}/Esctritorio/proyectos/${activeProject.id}/items/${id}`).update(item);

        dispatch(editItem(item));
    }

}



const editItem = (item) => ({
    type: types.itemEditItem,
    payload: { ...item }
});


export const startDeleting = (id) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeProject } = getState().proyecto;

        await db.doc(`${uid}/Esctritorio/proyectos/${activeProject.id}/items/${id}`).delete();

        dispatch(deleteItem(id));
    }


}

const deleteItem = (item) => ({
    type: types.itemDelete,
    payload: item
})


const setItems = (items) => ({
    type: types.itemLoad,
    payload: items
})

export const setTotal = (total) => ({
    type: types.itemLoadTotal,
    payload: total
})

export const cleanItems = () => ({ type: types.itemClean });