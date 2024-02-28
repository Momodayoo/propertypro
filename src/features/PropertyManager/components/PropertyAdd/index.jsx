import { useProperty, createProperty } from "../../PropertyContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";

const PropertyAdd = () => {
    const { state: {itemError, itemLoading}, dispatch } = useProperty().value;

    const addProperty = async (event) => {
        event.preventDefault();
        
        // get form values
        
        const image = event.target.image.files[0];
        const profile = event.target.profile.value;
        const price = event.target.price.value;
        const type = event.target.type.value;
        const address = event.target.address.value;

        // create form data
        const formData = new FormData();
        formData.append("image", image);
        formData.append("profile", profile);
        formData.append("price", price);
        formData.append("type", type);
        formData.append("address", address);
        
        // create property
        await createProperty(dispatch, formData);
    }

    return itemLoading ? ( 
        <Loader />
    ) : itemError ? (
        <Alert severity="error" message={itemError} />
    ) : (
        <form onSubmit={addProperty}>
            <TextField
                fullWidth
                required
                id="image"
                name="image"
                type="file"
                label="Required"
                margin="normal"
                placeholder="Please enter your image"
            />
            <TextField
                fullWidth
                required
                id="profile"
                name="profile"
                label="Required"
                placeholder="Please enter your house profile"
                margin="normal"
            />
            <TextField
                fullWidth
                required
                id="price"
                name="price"
                type="number"
                label="Required"
                placeholder="Please enter your price"
                margin="normal"
            />
            <TextField
                fullWidth
                required
                id="type"
                name="type"
                label="Required"
                placeholder="Please enter your house type"
                margin="normal"
            />
            <TextField
                fullWidth
                required
                id="address"
                name="address"
                label="Required"
                placeholder="Please enter your address"
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Add Property
            </Button>
        </form>
    );
};

    export default PropertyAdd;