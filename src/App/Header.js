/*
  The main header component of the app
  Contains the sidebar
*/

// react
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import { withRouter } from 'react-router-dom';
import {
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  InputBase,
  Tooltip
} from '@material-ui/core';
import {
  HomeRounded,
  AccountCircle,
  Search,
  MenuRounded,
  FaceRounded
} from '@material-ui/icons';
import SideBar from './SideBar';

// misc
import {
  authMenus,
  noAuthMenus,
  toolTipIcons
} from '../Common/DefaultValues/iconButtonArrays';

const Header = props => {
  const { classes, isAuthenticated, history, signOut } = props;

  // account icon menu anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // side bar open state
  const [sideBar, setSideBar] = useState(false);

  const handleRouteChange = path => {
    history.push(path);
  };

  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // close the menu when item click in menu
  const handleMenuClick = path => {
    handleClose();
    handleRouteChange(path);
  };

  // close the menu on signout
  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  // sign out in array doesn't provide path
  const handleSideBarSelect = path => {
    if (!path) {
      signOut();
    } else {
      handleRouteChange(path);
    }
    // close the sidebar
    setSideBar(false);
  };

  // using material ui to get view port width
  // inline animation require responsive
  const theme = useTheme();
  const showMenuIcons = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {/* sidebar */}
      <SideBar
        handleClose={() => setSideBar(false)}
        classes={classes}
        show={sideBar && !showMenuIcons}
        isAuthenticated={isAuthenticated}
        handleSideBarSelect={handleSideBarSelect}
      />

      {/* app bar */}
      <AppBar position='fixed'>
        <Toolbar disableGutters className={classes.menuBarLayout}>
          <div className={classes.menuBarLeft}>
            {/* display sidebar menu on small device */}
            {!showMenuIcons && (
              <IconButton onClick={() => setSideBar(true)} color='inherit'>
                <MenuRounded />
              </IconButton>
            )}
            <IconButton color='inherit' onClick={() => handleRouteChange('/')}>
              <HomeRounded />
            </IconButton>
          </div>

          {/* rightside of the menu bar, contains most icons */}
          <div className={classes.menuBarRight}>
            {/* search bar, copied style from material ui */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>

            {/* if big device, display */}
            {showMenuIcons && (
              <>
                {toolTipIcons.map((menuItem, index) => (
                  <Tooltip key={index} title={menuItem.title}>
                    <IconButton
                      color='inherit'
                      onClick={() => handleRouteChange(menuItem.path)}
                    >
                      {menuItem.icon}
                    </IconButton>
                  </Tooltip>
                ))}

                {/* small simple menu */}
                <Tooltip title='Account'>
                  <IconButton
                    onClick={handleClick}
                    style={{ color: '#eceff4' }}
                  >
                    {isAuthenticated ? <AccountCircle /> : <FaceRounded />}
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {isAuthenticated
                    ? authMenus.map((item, index) => (
                        <MenuItem
                          onClick={
                            item.path
                              ? () => handleMenuClick(item.path)
                              : handleSignOut
                          }
                          key={index}
                        >
                          {item.text}
                        </MenuItem>
                      ))
                    : noAuthMenus.map((item, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleMenuClick(item.path)}
                        >
                          {item.text}
                        </MenuItem>
                      ))}
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired
};

export default withRouter(Header);