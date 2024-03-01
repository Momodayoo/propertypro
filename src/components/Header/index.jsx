import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { NavLink, Link as RouterLink } from "react-router-dom";
import Link from '@mui/material/Link';
import ThemeSwitch from '../ThemeSwitch';

const LogoLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'inherit',
  flexGrow: 1,
});

const LogoImg = styled('img')(() => ({ 
  width: 100,
  height: 100,
  marginRight: 10,

  "@media (max-width:640px)": {
    width: 100,
    height: 28,
  },
}));

const HeaderLink = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textDecoration: 'none',
  color: 'inherit',
}));

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LogoLink component={RouterLink} to="/">
        
          <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'flex' } }}>Property Pro</Typography>
        </LogoLink>
        <nav>
          <HeaderLink component={NavLink} to="/"></HeaderLink>
          <HeaderLink component={NavLink} to="/Home"></HeaderLink>
          <HeaderLink component={NavLink} to="/users">Users</HeaderLink>
          <HeaderLink component={NavLink} to="/Property">Property</HeaderLink>
          <HeaderLink component={NavLink} to="/Posts">Market</HeaderLink>
          <HeaderLink component={NavLink} to="/">Log out</HeaderLink>
        </nav>
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
