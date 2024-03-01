import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box'; // Add this line
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';

// Your component code here

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [comments, setComments] = useState({});
  const [users, setUsers] = useState({});


// Add state to store user data 
const fetchData = async () => {
  try {
    const [propertyResponse, userResponse] = await Promise.all([
      fetch('http://localhost:3000/api/property/'),
      fetch('http://localhost:3000/api/users/') 
    ]);
    if (!propertyResponse.ok || !userResponse.ok) {
      throw new Error('Network response was not ok');
    }
    const [propertyData, userData] = await Promise.all([
      propertyResponse.json(),
      userResponse.json()
    ]);
    // Map user data to an object for easy access
    const userMap = userData.reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
    console.log (userMap)
    setProperties(propertyData);
    setUsers(userMap);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    const fetchData = async () => {
      console.log("I the use effect ran");
      try {
        const response = await fetch('http://localhost:3000/api/property/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();

        if (data.result === 200) {
          data=data.data;
          if (sortBy) {
            switch (sortBy) {
              case 'priceAsc':
                data = data.sort((a, b) => a.price - b.price);
                break;
              case 'priceDesc':
                data = data.sort((a, b) => b.price - a.price);
                break;
              case 'typeAsc':
                data = data.sort((a, b) => (a.type > b.type ? 1 : -1));
                break;
              case 'typeDesc':
                data = data.sort((a, b) => (b.type > a.type ? 1 : -1));
                break;
              default:
                break;
            }
          }
          const initialComments = data.reduce((acc, property) => {
            acc[property.id] = [];
            return acc;
          }, {});
          
          setProperties(data);
          setComments(initialComments);
        } else {
          // handle error
        }

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy]);

  const handleLike = async (id) => {
    const updatedProperties = properties.map(property => {
        if (property.id === id) {
          return { ...property, likes: (property.likes || 0) + 1 };
        }
        return property;
      });
      setProperties(updatedProperties);
  };

  const handleCommentChange = (event, id) => {
    const newComments = { ...comments, [id]: event.target.value };
    setComments(newComments);
  };

  const handleAddComment = async (id) => {
    const newComment = comments[id];
    try {
      const response = await fetch('http://localhost:3000/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, comment: newComment }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Update the state with the new comment
        const newComments = { ...comments, [id]: '' };
        setComments(newComments);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="priceAsc">Price - Ascending</option>
        <option value="priceDesc">Price - Descending</option>
        <option value="typeAsc">Type - Ascending</option>
        <option value="typeDesc">Type - Descending</option>
      </select><br /> <br />
      {/* <h1>Property List</h1> */}
      {properties.map(property => (
        <Box key={property.id} sx={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          {property.image && <img
  src={`${import.meta.env.VITE_IMAGE_URL}/${property.image}`}
  alt="Property"
  style={{ display: 'block', margin: 'auto', maxWidth: '400px', maxHeight: '400px' }}
/>
}

          <br />
          <strong>Name:</strong> {property.profile}<br />
          <strong>Type:</strong> {property.type}<br />
          <strong>Location:</strong> {property.address}<br />
          <strong>Price:</strong> ${property.price}<br />
          <strong>Description:</strong> {property.description}<br />
          <strong>Owner:</strong> {users[property.userId] || 'Unknown'}<br />
          <strong>Contact:</strong> {users.email}<br />

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
      ))}
    </div>
  );
};

export default PropertyList;
