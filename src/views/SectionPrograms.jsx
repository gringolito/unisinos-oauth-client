import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomSelect from "components/CustomInput/CustomSelect.jsx";

import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";

class SectionPrograms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        callbacks: props.callbacks,
    };
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div className={classes.title}>
            <h2>Check Your Health Programs Subscriptions</h2>
          </div>
          <div id="subscribed">
            <div className={classes.title}>
              <h4>
                Here you can see the health programs that your are subscribed.
              </h4>
            </div>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={6} md={8}>
                <Button color="primary" onClick={this.state.callbacks.onGetHealthProgramsClick}>
                  Check your programs
                </Button>
              </GridItem>
              <GridItem xs={12} sm={6} md={8}>
                <div className={classes.space50}>
                  {this.props.user.subscribedPrograms}
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <div className={classes.space50} />
          <div className={classes.title}>
            <h2>Health Programs Subscription</h2>
          </div>
          <div id="subscription">
            <div className={classes.title}>
              <h4>
                In this section you can subscribe to new health programs offered by your Health Insurance Plan.
              </h4>
            </div>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={6} md={8}>
                <CustomSelect
                  labelText="Pick a program"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onSelectChange={this.state.callbacks.onSubscribeProgramChange}
                  selectValue={this.props.user.subscribeProgram}
                  selectOptions={[
                    <option value="Tobacco quitting" key="1">Tobacco quitting</option>,
                    <option value="Alcoholism quitting" key="2">Alcoholism quitting</option>,
                    <option value="Overweight prevention" key="3">Overweight prevention</option>,
                    <option value="Lose weight" key="4">Lose weight</option>,
                    <option value="Posture correction" key="5">Posture correction</option>,
                    <option value="Better sleep" key="6">Better sleep</option>,
                    <option value="Morning walk" key="7">Morning walk</option>
                  ]}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={8}>
                <Button color="primary" onClick={this.state.callbacks.onSubscribeClick}>
                  Subscribe
                </Button>
             </GridItem>
            </GridContainer>
          </div>
          <div className={classes.space50} />
          <div className={classes.title}>
            <h2>Health Programs Unsubscription</h2>
          </div>
          <div id="unsubscription">
            <div className={classes.title}>
              <h4>
                In this section you can unsubscribe from a health program that your are participating.
              </h4>
            </div>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={6} md={8}>
                <CustomSelect
                  labelText="Pick a program"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  onSelectChange={this.state.callbacks.onUnsubscribeProgramChange}
                  selectValue={this.props.user.unsubscribeProgram}
                  selectOptions={[
                    <option value="Tobacco quitting" key="1">Tobacco quitting</option>,
                    <option value="Alcoholism quitting" key="2">Alcoholism quitting</option>,
                    <option value="Overweight prevention" key="3">Overweight prevention</option>,
                    <option value="Lose weight" key="4">Lose weight</option>,
                    <option value="Posture correction" key="5">Posture correction</option>,
                    <option value="Better sleep" key="6">Better sleep</option>,
                    <option value="Morning walk" key="7">Morning walk</option>
                  ]}
                />
              </GridItem>
              <GridItem xs={12} sm={6} md={8}>
                <Button color="primary" onClick={this.state.callbacks.onUnsubscribeClick}>
                  Unsubscribe
                </Button>
             </GridItem>
            </GridContainer>
          </div>
          <div className={classes.space70} />
       </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SectionPrograms);