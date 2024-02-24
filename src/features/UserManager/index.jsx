import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemSecondaryAction } from "@mui/material";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Loader } from "../../components/Loader";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setLoading(true);
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        switch (data.result) {
          case 200:
            console.log("200");
            setUsers(data.data);
            setLoading(false);
            break;
          case 404:
            console.log("404");
            setLoading(false);
            setError(data.message);
            break;
          case 500:
            console.log("500");
            setError(data.message);
            setLoading(false);
            break;
          default:
            console.log("default");
            setError(data.message);
            setLoading(false);
            break;
        }
        // TODO: handle all the possible responses
      })
      .catch(() => {
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      });
  }, []);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      setSelectedUser(id);
    };

    const deleteUser = (event) => {
      const deleteUser = confirm("Are you sure you want to delete this user?");
      if (!deleteUser) {
        return false;
      }
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result === 200) {
            setUsers(users.filter((user) => user.id != parseInt(id)));
          }
        });
    };

    return (
      <List sx={{ width: "100%" }}>
        {users.map((user) => (
          <ListItemButton
            key={user.id}
            selected={selectedUser === user.id.toString()}
            onClick={handleListItemClick}
            data-id={user.id}
          >
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                data-id={user.id}
                onClick={deleteUser}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    );
  };

  return (
    <>
      <Grid xs={12} sm={6}>
        {!loading ? <UserList /> : <Loader />}
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
      <Grid xs={12} sm={6}></Grid>
    </>
  );
};

export default UserManager;
