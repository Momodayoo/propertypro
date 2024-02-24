import { useReducer, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemSecondaryAction } from "@mui/material";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Loader } from "../../components/Loader";
import { userReducer, initialState } from "./userReducer";

const UserManager = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  /* const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); */

  useEffect(() => {
    dispatch({ type: "FETCH_USERS_REQUEST" });
    fetch("http://localhost:3000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        switch (data.result) {
          case 200:
            // console.log("200");
            dispatch({ type: "FETCH_USERS_SUCCESS", payload: data.data });
            break;
          case 404:
            // console.log("404");
            dispatch({ type: "FETCH_USERS_FAILURE", payload: data.message });
            break;
          case 500:
            // console.log("500");
            dispatch({ type: "FETCH_USERS_FAILURE", payload: data.message });
            break;
          default:
            // console.log("default");
            dispatch({ type: "FETCH_USERS_FAILURE", payload: data.message });
            break;
        }
        // TODO: handle all the possible responses
      })
      .catch(() => {
        dispatch({
          type: "FETCH_USERS_FAILURE",
          payload: "Something went wrong. Please try again later.",
        });
      });
  }, []);

  const UserList = () => {
    const handleListItemClick = (event) => {
      event.preventDefault();
      const id = event.currentTarget.dataset.id;
      dispatch({ type: "SELECT_USER", payload: id });
    };

    const deleteUser = (event) => {
      const deleteUser = confirm("Are you sure you want to delete this user?");
      if (!deleteUser) {
        return false;
      }
      dispatch({ type: "DELETE_USERS_REQUEST" });
      const id = event.currentTarget.dataset.id;
      fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result === 200) {
            dispatch({ type: "DELETE_USERS_SUCCESS", payload: state.users.filter((user) => user.id != parseInt(id) ) });
          }
        }).catch(() => {
          dispatch({ type: "DELETE_USERS_FAILURE", payload: "Something went wrong. Please try again later." });
        });
    };

    return (
      <List sx={{ width: "100%" }}>
        {state.users.map((user) => (
          <ListItemButton
            key={user.id}
            selected={state.selectedUser === user.id.toString()}
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
      <Grid item xs={12} sm={6}>
        {!state.loading ? <UserList /> : <Loader />}
        {state.error && <Alert severity="error">{state.error}</Alert>}
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </>
  );
};

export default UserManager;
