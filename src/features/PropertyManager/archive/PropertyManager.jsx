import { useEffect, useReducer } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Loader from "../../components/Loader";
import { propertyReducer, initialState } from "../propertyReducer";

const PropertyManager = () => {
    const [state, dispatch] = useReducer(propertyReducer, initialState);

  useEffect(() => {
    dispatch({ type: "FETCH_PROPERTY_REQUEST" });
    fetch("http://localhost:3000/api/property")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        switch (data.result) {
          case 200:
            dispatch({ type: "FETCH_PROPERTY}_SUCCESS", payload: data.data });
            break;
          case 404:
            dispatch({ type: "FETCH_PROPERTY_FAILURE", payload: "Endpoint not found" });
            break;
          case 500:
            dispatch({ type: "FETCH_PROPERTY_FAILURE", payload: data.message });
            break;
          default:
            dispatch({ type: "FETCH_PROPERTY_FAILURE", payload: "Something went wrong. Please try again later." });
            break;
        }
        // TODO: handle all the possible responses
      }).catch((error) => {
        console.error("Error fetching property", error);
        dispatch({ type: "FETCH_PROPERTY_FAILURE", payload: "Something went wrong. Please try again later." });
      }).finally(() => {
        //;
      }
    );
  }, []);

  const PropertyList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      dispatch({ type: "SELECT_PROPERTY", payload: id });
    };

    const deleteProperty = (event) => {
      const deleteProperty = confirm("Are you sure you want to delete this property?");
      if (!deleteProperty) {
        return false;
      }
      dispatch({ type: "DELETE_PROPERTY_REQUEST" });
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/property/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.result === 200) {
            dispatch({ type: "DELETE_PROPERTY_SUCCESS", payload: id });
          }
        }).catch((error) => {
          console.error("Error deleting property", error);
          dispatch({ type: "DELETE_PROPERTY_FAILURE", payload: "Something went wrong. Please try again later." });
        }).finally(() => {
          // setLoading(false);
        }
      );
      };



    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {property.map((property) => (
          <ListItemButton
            key={property.id}
            selected={state.selectedProperty === property.id.toString()}
            onClick={handleListItemClick}
            data-id={property.id}
          >
            <ListItemText primary={property.profile} secondary={property.type} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" data-id={property.id} onClick={deleteProperty}>
                <DeleteIcon />
              </IconButton>
          </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <>
      <Grid item xs={12} sm={6}> 
        {state.loading ? <Loader /> : <PropertyList />}
        {state.error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default PropertyManager;
