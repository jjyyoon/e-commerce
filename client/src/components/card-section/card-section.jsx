import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Header, Label } from "semantic-ui-react";
import "./card-section.styles.scss";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Muli", sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
  },
};

const CardSection = () => (
  <div>
    <Header as="h4" icon="credit card" content="PAYMENT INFORMATION" />
    <div className="payment-info">
      <Label>Card</Label>
      <label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
    <div className="instruction">
      <p>Please use this card information.</p>
      <p>Number: 4000 0082 6000 0000, Date: Any future date, CVC: Any 3 digits</p>
      <p>
        This test card's billing country is set to U.K. If you would like to create test card
        payments using cards for other billing countries, please check{" "}
        <a
          href="https://stripe.com/docs/testing#international-cards"
          target="_blank"
          rel="noopener noreferrer"
        >
          here.
        </a>
      </p>
    </div>
  </div>
);

export default CardSection;
