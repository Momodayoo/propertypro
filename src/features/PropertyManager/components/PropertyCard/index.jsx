import { Box, Button, TextField } from '@mui/material';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import { useState, useEffect } from 'react';


const PropertyCard = ({property, comments, handleCommentChange, handleAddComment, handleLike}) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/${property.userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                setUserData(data.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        fetchData();
    },[]);

    return (
        <Box sx={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            {property.image && <img
                src={`${import.meta.env.VITE_IMAGE_URL}/${property.image}`}
                alt="Property"
                style={{ display: 'block', margin: 'auto', maxWidth: '400px', maxHeight: '400px' }}
                />
            }
            <br />

            <strong>Profile:</strong> {property.profile}<br />
            <strong>Type:</strong> {property.type}<br />
            <strong>Location:</strong> {property.address}<br />
            <strong>Price:</strong> ${property.price}<br />

            {userData && (
                <>
                    <strong>Owner:</strong> {userData.name}<br />
                    <strong>Contact:</strong> {userData.email}<br />
                </>
            )}

            <Button onClick={() => handleLike(property.id)}>
                <FavoriteBorderTwoToneIcon />
            </Button>
            <span>{property.likes || 0}</span>
            <br />
            <TextField
                label="Add a comment"
                variant="outlined"
                value={comments[property.id] || ''}
                onChange={(event) => handleCommentChange(event, property.id)}
                sx={{ marginTop: '10px', width: '100%' }}
            />
            <Button onClick={() => handleAddComment(property.id)}>Add Comment</Button>
        </Box>      


        
    );
}

export default PropertyCard;



