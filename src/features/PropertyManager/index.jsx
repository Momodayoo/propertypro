import React, { useContext, useEffect } from "react";
import { PropertyContext } from "../../pages/Property";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import PropertyList from "../../components/PropertyList";

function PropertyManager() {
  const { state, dispatch } = useContext(PropertyContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/api/property`)
      .then((response) => response.json())
      .then((propertyData) => {
        switch (propertyData.result) {
          case 200:
            dispatch({ type: "GET_PROPERTY_SUCCESS", payload: propertyData.data });
            break;
          case 404:
            dispatch({ type: "GET_PROPERTY_FAILURE", payload: propertyData.message });
            break;
          case 500:
            dispatch({ type: "GET_PROPERTY_FAILURE", payload: propertyData.message });
            break;
          default:
            dispatch({ type: "GET_PROPERTY_FAILURE", payload: propertyData.message });
            break;
        }
      })
      .catch((error) =>
        dispatch({ type: "GET_PROPERTY_FAILURE", payload: error.message })
      );
  }, []);

  return (
    <Box sx={{ paddingTop: 2, paddingBottom: 2, paddingRight: 2 }}>
      {state.error && <Alert severity="error">{state.error}</Alert>}
      <PropertyList property={state.property}/>
    </Box>
  );
}

export default PropertyManager;