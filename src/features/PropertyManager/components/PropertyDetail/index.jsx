import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProperty, getProperty, deleteProperty } from "../../PropertyContext";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const PropertyDetail = () => {
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
        fetchData();
        console.log(import.meta.env.VITE_IMAGE_URL) 
    }, [dispatch, id]);

    const handleDelete = async () => {
        await deleteProperty(dispatch, id);
        navigate("/Property");
    };

    return itemLoading ? (
        <Loader />
    ) : itemError ? (
        <Alert severity="error" message={itemError} />
    ) : (
        <div>
            <img src={`${import.meta.env.VITE_IMAGE_URL}/${currentProperty ? currentProperty.image : ""}`} alt={currentProperty ? currentProperty.profile : ""} className="property-img"/>
            <h1>{currentProperty ? currentProperty.profile : ""}</h1>
            <p>{currentProperty ? currentProperty.price : ""}</p>
            <p>{currentProperty ? currentProperty.type : ""}</p>
            <p>{currentProperty ? currentProperty.address : ""}</p>
            <Link to={`/Property/${id}/edit`}>
                <Button variant="outlined">Edit</Button>
            </Link>
            <Button variant="outlined" color="error" sx={{ marginLeft: 2 }} onClick={handleDelete}>Delete</Button>
        </div>

    );
};

export default PropertyDetail;