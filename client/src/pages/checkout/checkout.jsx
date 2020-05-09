import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { handleFetch } from "../../handle-fetch";

import { Form, Header, Divider, Button } from "semantic-ui-react";
import CustomSegment from "../../components/custom-segment/custom-segment";
import CardSection from "../../components/card-section/card-section";
import CheckoutDimmer from "../../components/checkout-dimmer/checkout-dimmer";
import WithAuth from "../../components/with-auth/with-auth";

import "./checkout.styles.scss";

const CheckoutPage = ({ history, location: { state }, user: { firstName, lastName, email }, setCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [dimmer, setDimmer] = useState(false);
  const [dimmerContent, setDimmerContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!state) {
    alert("Please check your cart first.");
    history.push("/cart");
    return null;
  }

  const { subtotal, formattedSubtotal } = state;

  const returnCheckout = () => {
    setDimmer(false);
    setDimmerContent(null);
    setErrorMessage(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setDimmer(true);

    const { name, email, address, city, country } = e.target;

    if (!name.value || !email.value || !address.value || !city.value || !country.value) {
      setDimmerContent("emptyField");
      return;
    }

    try {
      const { match, clientSecret } = await handleFetch("/shop/checkout", { subtotal });

      if (!match) {
        setDimmerContent("matchError");
        setErrorMessage("Error: The amount you pay does not match the total price of your shopping cart.");
        return;
      }

      const payment_method = {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name.value,
          email: email.value,
          address: { line1: address.value, city: city.value }
        }
      };

      const result = await stripe.confirmCardPayment(clientSecret, { payment_method });

      if (result.error) {
        setDimmerContent("paymentError");
        setErrorMessage(result.error.type + ": " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setDimmerContent("paymentSuccess");
        handleFetch("/shop/cart/empty").then(cart => setCart(cart));
      }
    } catch (error) {
      setDimmerContent("paymentError");
      setErrorMessage(error.name + ": " + error.message);
    }
  };

  const fields = ["name", "email", "address", "city", "postcode", "country"];
  const name = firstName + " " + lastName;

  return (
    <CustomSegment
      page="checkout-page"
      icon="shopping basket"
      header="Complete your shipping and payment details below."
    >
      {dimmer && (
        <CheckoutDimmer
          returnCheckout={returnCheckout}
          contentType={dimmerContent}
          errorMessage={errorMessage}
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Header as="h4" icon="shipping" content="SHIPPING & BILLING INFORMATION" />
        {fields.map((field, idx) => {
          const className = idx === 0 ? "first" : idx === fields.length - 1 ? "last" : null;

          return (
            <Form.Field key={idx} className={className} inline>
              <label>{field}</label>
              <input
                name={field}
                type={field === "email" ? "email" : "text"}
                defaultValue={field === "name" ? name : field === "email" ? email : null}
                required
              />
            </Form.Field>
          );
        })}
        <Divider />
        <CardSection />
        <Button disabled={!stripe || !elements}>
          {stripe && elements ? "Pay " + formattedSubtotal : "Our payment tool has not yet loaded."}
        </Button>
      </Form>
    </CustomSegment>
  );
};

export default WithAuth(CheckoutPage);
