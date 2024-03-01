
import Grid from "@mui/material/Grid";
import AddHomeIcon from '@mui/icons-material/AddHome';;
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import PropertyManager from "../../features/PropertyManager";

const Property = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Typography variant="h4"> Property</Typography>
      </Grid>
      <Grid item xs={12} sm={6} container justifyContent={'flex-end'}>
        <Link to="/Property/add">
          <Button variant="outlined" startIcon={<AddHomeIcon />}>
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