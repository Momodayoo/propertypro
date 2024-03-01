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
    const userId = event.target.userId.value;
    const address = event.target.address.value;
    const type = event.target.type.value;
    const price = event.target.price.value;
    const image = event.target.image.files[0];
    const profile = event.target.profile.value;

    // create form data
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("address", address);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("profile", profile);

    await createProperty(dispatch, formData);
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <form onSubmit={addProperty}>
      <TextField
        fullWidth
        required
        id="userId"
        name="userId"
        label="Required"
        placeholder="Please enter your user ID"
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
      <TextField
        fullWidth
        required
        id="type"
        name="type"
        label="Required"
        placeholder="Please enter your type"
        margin="normal"
      />
      <TextField
        fullWidth
        required
        id="price"
        name="price"
        label="Required"
        placeholder="Please enter your price"
        margin="normal"
        />
      <TextField
        fullWidth
        id="image"
        name="image"
        type="file"
        margin="normal"
        placeholder="Please upload your image"
      />
        <TextField
        fullWidth
        required
        id="profile"
        name="profile"
        label="Required"
        placeholder="Give a the best title for your property"
        margin="normal"
        />
      <Button type="submit" variant="outlined">
        Add Property
      </Button>
    </form>
  );
};

export default PropertyAdd;