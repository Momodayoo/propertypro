import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProperty, getAllProperty, deleteProperty } from "../../PropertyContext";
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
      await getAllProperty(dispatch, id);
    }
    fetchData();
    console.log(import.meta.env.VITE_IMAGE_URL)
  }, [dispatch, id]);

  const handleDelete = async () => {
    await deleteProperty(dispatch, id);
    navigate("/property");
  };

  return itemLoading ? (
    <Loader />
  ) : itemError ? (
    <Alert severity="error" message={itemError} />
  ) : (
    <div>
      <img src={`${import.meta.env.VITE_IMAGE_URL}/${currentProperty ? currentProperty.image : ""}`} alt={currentProperty ? currentProperty.name : ""} className="property-img"/>
      <h1>{currentProperty ? currentProperty.profile : ""}</h1>
      <p>{currentProperty ? currentProperty.type : ""}</p>
      <Link to={`/property/${id}/edit`}>
        <Button variant="outlined">Edit</Button>
      </Link>
      <Button variant="outlined" color="error" sx={{ marginLeft: 2 }} onClick={handleDelete}>Delete</Button>
    </div>

  );
};

export default PropertyDetail;