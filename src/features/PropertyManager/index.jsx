import { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useProperty, getAllProperty, selectProperty } from "./PropertyContext";
import { useAuth } from "../AuthManager/AuthContext";


const PropertyManager = () => {
  const {
    state: { loading, property, selectedProperty, error},
    dispatch,
  } = useProperty().value;
  const { state: { token } } = useAuth().value;
 const navigate = useNavigate();


  useEffect(() => { 
    getAllProperty(dispatch, token);
  }, [dispatch, token]);

  const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      selectProperty(dispatch, id);
      dispatch({ type: "SELECT_PROPERTY", payload: id });
      navigate(`/property/${id}`);
    };
console.log(property);
  const PropertyList = () =>  
  (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {property.map((pro) => (
                  
                    <ListItemButton
                    
                        key={pro.id}
                        selected={selectedProperty === pro.id.toString()}
                        onClick={handleListItemClick}
                        data-id={pro.id}
                >
                        <ListItemText primary={pro.profile} secondary={pro.type} /> {/* check this line whether changed from user.name and user.email, change to property image or email or profile*/}
                    </ListItemButton>
                ))}
            </List>
        );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {loading ? <Loader /> : <PropertyList />}
        {error && <Alert severity="error">This is an error Alert.</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default PropertyManager;