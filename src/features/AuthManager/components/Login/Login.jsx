import { useAuth, login } from "../../AuthContext";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Loader from "../../../../components/Loader";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    state: { loading, error, isAuthenticated},
    dispatch,
  } = useAuth().value;

  const loginUser = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await login(dispatch, email, password);
  };

  return (
    <form onSubmit={loginUser}>
      <TextField
        fullWidth
        required
        id="email"
        name="email"
        type="email"
        placeholder="Please enter your email address"
        margin="normal"
      />
      <TextField
        fullWidth
        required
        id="password"
        name="password"
        type="password"
        placeholder="Please enter your password"
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        Login
      </Button>
      {loading && <Loader />}
      {error && <Alert severity="error" message={error} />}
      <br />
      <Typography variant="body2">
        <Button component={Link} to="/Register">Signup</Button>
      </Typography>
      {isAuthenticated && <Navigate to="/home" />}
    </form>
  );
};

export default Login;
