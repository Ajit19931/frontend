import React from 'react';
import {Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
          label: "Address",
          icon: <LocalShippingIcon />,
        },
        {
          label: "Order Summary",
          icon: <LibraryAddCheckIcon />,
        },
        {
          label: "Payment",
          icon: <AccountBalanceIcon />,
        },
      ];
    
      const stepStyles = {
        boxSizing: "border-box",
      };
  return (
    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
    {steps.map((item, index) => (
      <Step
        key={index}
        active={activeStep === index ? true : false}
        completed={activeStep >= index ? true : false}
      >
        <StepLabel
          style={{
            color: activeStep >= index ? "#198754" : "rgba(0, 0, 0, 0.649)",
          }}
          icon={item.icon}
        >
          {item.label}
        </StepLabel>
      </Step>
    ))}
  </Stepper>
  )
}

export default CheckoutSteps