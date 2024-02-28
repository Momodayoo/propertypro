import { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import {useProperty, getProperties} from "./PropertyContext";
import { useAuth } from "../AuthManager/AuthContext";

const PropertyManager = () => {
    const {
        state: { property, selectedProperty, loading, error },
        dispatch,
    } = useProperty().value;
    const { state: { token } } = useAuth().value;
    const navigate = useNavigate();

    useEffect(() => {    
        async function fetchData() {
            getProperties(dispatch, token);
        }
        fetchData();
    }, [dispatch, token]);

    const PropertyList = () => {
        const handleListItemClick = (event) => {
            event.preventDefault();
            const id = event.currentTarget.dataset.id;
            dispatch({ type: "SELECT_PROPERTY", payload: id });
            navigate(`/Property/${id}`);
        };

        return (
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
                {property.map((property) => (
                    <ListItemButton
                        key={property.id}
                        selected={selectedProperty === property.id.toString()}
                        onClick={handleListItemClick}
                        data-id={property.id}
                    >
                        <ListItemText primary={property.name} secondary={property.address} />
                    </ListItemButton>
                ))}
            </List>
        );
    };  

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