import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import MenuItem from '@mui/material/MenuItem';

import FancyButton from "../routes/lab2/FancyButton";

import { ThemeContext } from "../ThemeContext";
import { useContext } from "react";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

import { Link } from 'react-router-dom';

function MUI_Navbar() {
  const [is_open, toggleSidebar] = useContext(ThemeContext).sidebar
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
      <AppBar position="sticky" sx={{ bgcolor: "pink" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                <MenuItem key={'home'} onClick={handleCloseNavMenu}>
                  <Link className="nav-link" to={"/"}>Главная</Link>
                </MenuItem>

                <MenuItem key={'about'} onClick={handleCloseNavMenu}>
                  <Link className="nav-link" to={"/about"}>Об авторе</Link>
                </MenuItem>

                <MenuItem key={'motilda'} onClick={handleCloseNavMenu}>
                  <Link className="nav-link" to={"/motilda"}>МОТИЛЬДА!</Link>
                </MenuItem>
                
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link className="nav-link" to={"/"}>Главная</Link>
                <Link className="nav-link" to={"/about"}>Об авторе</Link>
                <Link className="nav-link" to={"/motilda"}>МОТИЛЬДА!</Link>
            </Box>

            <Box>

              {!is_open ? 
                  <FancyButton className="fbtn fbtn-success" onClick={toggleSidebar}>
                      {is_open ? <FaArrowRight></FaArrowRight> : <FaArrowLeft></FaArrowLeft>}
                  </FancyButton>
              : null }  
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default MUI_Navbar;