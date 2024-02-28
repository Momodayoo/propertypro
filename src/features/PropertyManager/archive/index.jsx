import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Grid from '@mui/material/Grid';
import Alert from "@mui/material/Alert";
import Loader from "../../../components/Loader";

const PropertyManager = () => {
  const [property, setProperty] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:3000/api/property")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        switch (data.result) {
          case 200:
            setProperty(data.data);
            break;
          case 404:
            setError("Endpoint not found");
            break;
          case 500:
            setError(data.message);
            break;
          default:
            setError("Something went wrong. Please try again later.");
            break;
        }
        // TODO: handle all the possible responses
      }).catch((error) => {
        console.error("Error fetching property", error);
        setError("Something went wrong. Please try again later.");
      }).finally(() => {
        setLoading(false);
      }
    );
  }, []);

  const PropertyList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      setSelectedProperty(id);
    };
  
    const deleteProperty = (event) => {
      const deleteProperty = confirm("Are you sure you want to delete this property?");
      if (!deleteProperty) {
        return false;
      }
      setError(null);
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/property/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === 200) {
            setProperty(property.filter((property) => property.id !== id));
          }
        }).catch((error) => {
          console.error("Error deleting property", error);
          setError("Something went wrong. Please try again later.");
        }).finally(() => {
          setLoading(false);
        }
        );
    };
  
   
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {property.map((property) => (
          <ListItemButton
            key={property.id}
            selected={selectedProperty === property.id}
            onClick={handleListItemClick}
            data-id={property.id}
            >
            <ListItemText primary={property.image} secondary={property.profile} tertiary={property.price}  />
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
      {loading ? <Loader /> : <PropertyList />}
      {error && <Alert severity="error">This is an error Alert.</Alert>}
    </Grid>
    <Grid item xs={12} sm={6}></Grid>
  </>
);
};

export default PropertyManager;