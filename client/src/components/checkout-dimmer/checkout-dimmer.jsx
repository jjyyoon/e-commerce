import React from "react";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import CustomDimmer from "../custom-dimmer/custom-dimmer";
import "./checkout-dimmer.styles.scss";

const CheckoutDimmer = ({ contentType, returnCheckout, errorMessage }) => {
  const history = useHistory();

  const contents = {
    emptyField: {
      onClickOutside: () => returnCheckout(),
      icon: "pause",
      header: "Please fill in all fields."
    },
    matchError: {
      onClickOutside: () => history.push("/cart"),
      icon: "pause",
      header: "It seems that your cart has been changed, please check your cart again."
    },
    paymentError: {
      onClickOutside: () => returnCheckout(),
      icon: "pause",
      header: "An error has occurred during the payment, please try again."
    },
    paymentSuccess: {
      onClickOutside: () => history.push("/"),
      icon: "heart",
      header: "The payment has completed successfully, thank you for shopping with us."
    }
  };

  return (
    <CustomDimmer
      onClickOutside={contentType && contents[contentType].onClickOutside}
      icon={contentType && contents[contentType].icon}
      header={contentType && contents[contentType].header}
    >
      {!contentType && <Loader size="medium">The payment is being processed...</Loader>}
      {errorMessage && <p>( {errorMessage} )</p>}
    </CustomDimmer>
  );
};

export default CheckoutDimmer;
