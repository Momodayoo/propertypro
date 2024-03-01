export const initialState = {
    property: [],
    currentProperty: null,
    selectedProperty: null,
    loading: false,
    itemLoading: false,
    error: null,
    itemError: null,
    };

export const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_ALL_PROPERTY_REQUEST":
            console.log(1);
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "FETCH_ALL_PROPERTY_SUCCESS":
            console.log(2);
            return {
                ...state,
               property: action.payload.data,
                loading: false,
                itemLoading: false,
            };
        case "FETCH_ALL_PROPERTY_FAILURE":
            console.log(3);
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "FETCH_PROPERTY_REQUEST":
            console.log(4);
            return {
                ...state,
                itemLoading: true,
                itemError: null,
            };
        case "FETCH_PROPERTY_SUCCESS":
            console.log(5);
            return {
                ...state,
                currentProperty: action.payload,
                itemLoading: false,
            };
        case "FETCH_PROPERTY_FAILURE":
            console.log(6);
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "SELECT_PROPERTY":
            console.log(7);
            return {
                ...state,
                selectedProperty: action.payload,
            };
        case "CREATE_PROPERTY_REQUEST":
            console.log(8);
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "CREATE_PROPERTY_SUCCESS":
            console.log(9);
            return {
                ...state,
                property: [...state.property, action.payload],
                itemLoading: false,
            };
        case "CREATE_PROPERTY_FAILURE":
            console.log(10);
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "UPDATE_PROPERTY_REQUEST":
            console.log(11);
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "UPDATE_PROPERTY_SUCCESS":
            return {
                ...state,
                property: state.property.map((property) =>
                    property.id === action.payload.id ? action.payload : property
                ),
                itemLoading: false,
            };
        case "UPDATE_PROPERTY_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        case "DELETE_PROPERTY_REQUEST":
            return {
                ...state,
                itemError: null,
                itemLoading: true,
            };
        case "DELETE_PROPERTY_SUCCESS":
            return {
                ...state,
                property: state.property.filter((property) => property.id !== action.payload),
                itemLoading: false,
            };
        case "DELETE_PROPERTY_FAILURE":
            return {
                ...state,
                itemError: action.payload,
                itemLoading: false,
            };
        default:
            return state;
    }
}
