export const initialState = {
    property: [],
    error: null,
}

export const propertyReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PROPERTY_SUCCESS':
            return {
                ...state,
                property: action.payload,
            }
        case "GET_PROPERTY_FAILURE":
            return {
                ...state,
                property: [],
                error: action.payload,
            }
        default:
            return state
    }
}