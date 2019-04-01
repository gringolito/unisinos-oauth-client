/*eslint-disable*/
import React from "react";
import { GoogleLogout } from 'react-google-login';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes, user } = props;
  return (
    <List className={classes.list}>
     <ListItem className={classes.listItem}>
        <CustomDropdown
          left
          caret={false}
          hoverColor="black"
          dropdownHeader={user.name}
          buttonText={
            <img
              src={user.image}
              width="40"
              alt="profile"
            />
          }
          buttonProps={{
            className:
              classes.navLink + " " + classes.imageDropdownButton,
            color: "transparent"
          }}
          dropdownList={[
            <GoogleLogout
              onLogoutSuccess={props.callbacks.onLogoutSuccess}
              buttonText='Logout'
            />
          ]}
        />
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
