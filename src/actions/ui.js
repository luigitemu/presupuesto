import { types } from "../types/types";

export const showMenu = () => ({ type: types.uiShowMenu });
export const hideMenu = () => ({ type: types.uiHideMenu });
export const openModal = () => ({ type: types.uiOpenModal });
export const closeModal = () => ({ type: types.uiCloseModal });
export const openModalEdit = () => ({ type: types.uiOpenModalEdit });
export const closeModalEdit = () => ({ type: types.uiCloseModalEdit });