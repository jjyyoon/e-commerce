import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { handleFetch } from "../../handle-fetch";

import { Form, Header, Input, Divider, Button } from "semantic-ui-react";
import CustomSegment from "../../components/custom-segment/custom-segment";
import CardSection from "../../components/card-section/card-section";
import WithAuth from "../../components/with-auth/with-auth";

import "./checkout.styles.scss";

const CheckoutPage = ({ history, location: { state }, user: { firstName, lastName, email } }) => {
  const stripe = useStripe();
  const elements = useElements();

  if (!state) {
    alert("Please check your cart first.");
    history.push("/cart");
    return null;
  }

  const { subtotal, formattedSubtotal } = state;
  const name = firstName + " " + lastName;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { match, clientSecret } = await handleFetch("/shop/checkout", { subtotal });

    if (!match) {
      // In case the subtotal doesn't match with subtotal in server
      // (ex. Cart has been changed after this page mounted)
      return;
    }

    const { name, email, address, city, country } = e.target;

    const payment_method = {
      card: elements.getElement(CardElement),
      billing_details: {
        name: name.value,
        email: email.value,
        address: { line1: address.value, city: city.value, country: country.value },
      },
    };

    const result = await stripe.confirmCardPayment(clientSecret, { payment_method });

    if (result.error) {
      console.log("Error: " + result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Succeeded!");
    }
  };

  return (
    <CustomSegment
      page="checkout-page"
      icon="shopping basket"
      header="Complete your shipping and payment details below."
    >
      <Form onSubmit={handleSubmit}>
        <Header as="h4" icon="shipping" content="SHIPPING & BILLING INFORMATION" />
        <Input label="Name" name="name" required fluid value={name} className="first" />
        <Input label="Email" name="email" required fluid value={email} type="email" />
        <Input label="Address" name="address" required fluid />
        <Input label="City" name="city" required fluid />
        <Input label="Postcode" name="postcode" required fluid />
        <Input label="Country" name="country" required fluid className="last" />
        <Divider />
        <CardSection />
        <Button disabled={!stripe || !elements}>Pay {formattedSubtotal}</Button>
      </Form>
    </CustomSegment>
  );
};

export default WithAuth(CheckoutPage);
