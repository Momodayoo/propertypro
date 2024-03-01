const getAllProperty = async (dispatch, token) => {
    dispatch({ type: "FETCH_PROPERTY_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/property`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        const data = await response.json();
        console.log(response);
        switch (data.result) {
            case 200:
                dispatch({ type: "FETCH_ALL_PROPERTY_SUCCESS", payload: data });
                console.log('success')
                break;
            case 404:
                dispatch({
                    type: "FETCH_ALL_PROPERTY_FAILURE",
                    payload: "Endpoint not found",
                });
                break;
            case 500:
                dispatch({ type: "FETCH_ALL_PROPERTY_FAILURE", payload: data.message });
                break;
            default:
                dispatch({
                    type: "FETCH_ALL_PROPERTY_FAILURE",
                    payload: "Something went wrong. Please try again later.",
                });
                console.log('default');
                break;
        }
    } catch (error) {
        console.error("Error fetching all property", error);
        dispatch({
            type: "FETCH_ALL_PROPERTY_FAILURE",
            payload: "Something went wrong all property actions. Please try again later.",
        });
    }
};

// const getProperty = async (dispatch, id) => {
//     dispatch({ type: "FETCH_PROPERTY_REQUEST" });
//     try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/property/${id}`);
//         const data = await response.json();
//         if (data.result === 200) {
//             // console.log(data);
//             dispatch({ type: "FETCH_PROPERTY_SUCCESS", payload: data.data });
//         } else {
//             dispatch({
//                 type: "FETCH_PROPERTY_FAILURE",
//                 payload: "Something went wrong. Please try again later.",
//             });
//         }
//     } catch (error) {
//         console.error("Error fetching property", error);
//         dispatch({
//             type: "FETCH_PROPERTY_FAILURE",
//             payload: "Something went wrong. Please try again later.",
//         });
//     }
// };

const createProperty = async (dispatch, property) => {
    dispatch({ type: "CREATE_PROPERTY_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/property`, {
            method: "POST",
            body: property,
        });
        const data = await response.json();
        if (data.result === 200) {
            dispatch({ type: "CREATE_PROPERTY_SUCCESS", payload: data.data });
        } else {
            dispatch({
                type: "CREATE_PROPERTY_FAILURE",
                payload: "Something went wrong. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Error creating property", error);
        dispatch({
            type: "CREATE_PROPERTY_FAILURE",
            payload: "Something went wrong with creating property. Please try again later.",
        });
    }
};

const updateProperty = async (dispatch, property) => {
    dispatch({ type: "UPDATE_PROPERTY_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/property/${property.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(property),
        });
        const data = await response.json();
        if (data.result === 200) {
            dispatch({ type: "UPDATE_PROPERTY_SUCCESS", payload: property });
        } else {
            dispatch({
                type: "UPDATE_PROPERTY_FAILURE",
                payload: "Something went wrong. Please try again later.",
            });
        }
    } catch (error) {
        console.error("Error updating property", error);
        dispatch({
            type: "UPDATE_PROPERTY_FAILURE",
            payload: "Something went wrong. Please try again later.",
        });
    }
};

const deleteProperty = async (dispatch, id) => {
    const deleteProperty = confirm("Are you sure you want to delete this property?");
    if (!deleteProperty) {
        return false;
    }
    dispatch({ type: "DELETE_PROPERTY_REQUEST" });
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/property/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.result === 200) {
            dispatch({ type: "DELETE_PROPERTY_SUCCESS", payload: Number(id) });
        }
    } catch (error) {
        console.error("Error deleting property", error);
        dispatch({
            type: "DELETE_PROPERTY_FAILURE",
            payload: "Something went wrong. Please try again later.",
        });
    }
};

const selectProperty = (dispatch, property) => {
    dispatch({ type: "SELECT_PROPERTY", payload: property });
}

export { deleteProperty, getAllProperty, createProperty, updateProperty, selectProperty };
