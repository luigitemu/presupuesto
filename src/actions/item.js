import { data } from "../data/data";
import { types } from "../types/types";
import { v4 as uuidv4 } from 'uuid';



export const startAddingItem = () => {

    const newItem = {
        key: uuidv4(),
        item: 'Item',
        quantity: 0,
        unityPrice: 0,
    }

    return (dispatch) => {

        dispatch(addNew(newItem));
    }



}

const addNew = (item) => ({
    type: types.itemAdd,
    payload: item
})


export const startLoadingItems = () => {


    return (dispatch) => {

        let total = 0;

        data.forEach(item => {
            total += (item.quantity * item.unityPrice);
        });


        dispatch(setItems(data));
        dispatch(setTotal(total));

    }


}


const setItems = (items) => ({
    type: types.itemLoad,
    payload: items
})

const setTotal = (total) => ({
    type: types.itemLoadTotal,
    payload: total
})