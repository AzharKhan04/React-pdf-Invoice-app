import { createStore } from 'redux';

const initialState = {
    addedProducts:[]
}
const appReducer = (state=initialState,action) => {

    switch (action.type) {
        case 'ADDED_PRODUCTS':
            return {...initialState,addedProducts:action.payload};
        default:
            return {...state}
    }

}
const store = createStore(appReducer)
export default store;