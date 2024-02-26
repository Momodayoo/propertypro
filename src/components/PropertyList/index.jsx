import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function PropertyList({property}) {
    const [expandedProfiles, setExpandedProfiles] = useState({});

    // Toggle the expanded state for a specific property
    const toggleProfileExpansion = (id) => {
        setExpandedProfiles((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
        }));
    };

    // Determine if the profile text is long enough to need an expansion button
    const isExpandable = (text) => {
        return text && text.length > 200; // Example threshold, adjust as needed
    };

    return (
      <Box sx={{ maxWidth: "75vw" }}>
        <Grid container spacing={3}>
          {property.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card sx={{ maxWidth: "50vw", m: "auto", }}>
                <CardMedia
                  sx={{ height: 300 }}
                  image={`${import.meta.env.VITE_REACT_APP_SERVER_URL}/images/${
                    property.image
                  }`}
                  title={property.profile}
                />
                <CardContent sx={{ minHeight: 190, minWidth: 300 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {property.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {property.image}{property.type} {property.address} {property.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      maxHeight: expandedProfiles[property.id] ? "none" : 10,
                      minHeight: isExpandable(property.profile) ? 80: 110,
                      overflow: "hidden",
                      marginTop: 1
                    }}
                  >
                    {property.profile}
                  </Typography>
                  {isExpandable(property.profile) && (
                    <Button
                      size="small"
                      onClick={() => toggleProfileExpansion(property.id)}
                      sx={{ marginLeft: -0.5 }}
                    >
                      {expandedProfiles[property.id] ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </CardContent>
                <CardActions>
                  <NavLink to={`/property/${property.id}`}>
                    <Button sx={{marginLeft: 1, marginTop: -2}} size="small" variant="outlined">View Timeline</Button>
                  </NavLink>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
};

export default PropertyList;