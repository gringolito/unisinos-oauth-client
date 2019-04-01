import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import customInputStyle from "assets/jss/material-kit-react/components/customInputStyle.jsx";

function CustomSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    selectProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    onSelectChange,
    selectValue,
    selectOptions
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const selectClasses = classNames({
    [classes.select]: true,
    [classes.whiteSelect]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        onChange={onSelectChange}
        value={selectValue}
        classes={{
          select: selectClasses,
          root: marginTop,
          disabled: classes.disabled
        }}
        id={id}
        {...selectProps}
      >
        {selectOptions}
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  selectProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  onSelectChange: PropTypes.func,
  selectValue: PropTypes.string,
  selectOptions: PropTypes.node
};

export default withStyles(customInputStyle)(CustomSelect);
