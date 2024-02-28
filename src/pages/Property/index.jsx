
import Grid from "@mui/material/Grid";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PropertyManager from "../../features/PropertyManager/archive";

const Property = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4">Property</Typography>
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent={'flex-end'}>
        <Link to="/Property/add">
          <Button variant="outlined" startIcon={<PersonAddAltIcon />}>
            Add Property
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12}>
        <PropertyManager />
      </Grid>
    </Grid>
  );
};

export default Property;