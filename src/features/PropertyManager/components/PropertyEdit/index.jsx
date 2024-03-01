import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProperty, getAllProperty, updateProperty } from "../../PropertyContext";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PropertyEdit = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const id = urlParams.id;
  const {
    state: { currentProperty, itemLoading, itemError },
    dispatch,
  } = useProperty().value;

  useEffect(() => {
    async function fetchData() {
      await getAllProperty(dispatch, id);
    }
    if (id) {
      fetchData();
    }
  }, [dispatch, id]);

  const updateCurrentProperty = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formdata = new FormData(form);
    const data = Array.from(formdata.entries()).reduce(
      (memo, [key, value]) => ({
        ...memo,
        [key]: value,
      }),
      {}
    );
    data.id = currentProperty.id;
    //const data = new FormData(form);
    await updateProperty(dispatch, data);
    navigate(`/property/${id}`);
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <form onSubmit={updateCurrentProperty}>
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
      <Button type="submit" variant="outlined">Update Property</Button>
    </form>
  );
};

export default PropertyEdit;