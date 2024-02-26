// import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled, useTheme } from "@mui/material/styles"; // Add useTheme import
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridItem from "../components/GridItem";
// import { createContext } from "react";

// export const layoutContext = createContext();

// function Layout() {
//   // const [open, setOpen] = React.useState(true);
//   // const [pageTitle, setPageTitle] = React.useState("Home");
//   const theme = useTheme();

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

const Main = styled("main")(() => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const Layout = () => {
  return (
    <Root>
      {/* <layoutContext.Provider value={{ open, setOpen, pageTitle, setPageTitle }}/> */}
        <Header />
        <Main>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <GridItem>
                <Outlet />
              </GridItem>
            </Grid>
          </Grid>
        </Main>
      <Footer />
    </Root>
  );
};

export default Layout;
