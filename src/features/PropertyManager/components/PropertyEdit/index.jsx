import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProperty, getProperty, updateProperty } from "../../PropertyContext";
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
        await getProperty(dispatch, id);
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
        navigate(`/Property/${id}`);
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
                id="profile"
                name="profile"
                label="Profile"
                placeholder="Please enter your profile"
                margin="normal"
                defaultValue={currentProperty ? currentProperty.profile : ""}
            />
            <TextField
                fullWidth
                required
                id="price"
                name="price"
                label="Price"
                placeholder="Please enter your price"
                margin="normal"
                defaultValue={currentProperty ? currentProperty.price : ""}
            />
            <TextField
                fullWidth
                required
                id="type"
                name="type"
                label="Type"
                placeholder="Please enter your type"
                margin="normal"
                defaultValue={currentProperty ? currentProperty.type : ""}
            />
            <TextField
                fullWidth
                required
                id="address"
                name="address"
                label="Address"
                placeholder="Please enter your address"
                margin="normal"
                defaultValue={currentProperty ? currentProperty.address : ""}
            />
            <Button type="submit" variant="outlined">Update</Button>
        </form>
    );
};

export default PropertyEdit;