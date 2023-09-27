import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useCartContext } from "../context/cart_context";
//import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { useNavigate, Link } from "react-router-dom";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { carts, total_amount, shipping_fee, clearCart } = useCartContext();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify({ carts, total_amount, shipping_fee })
      );

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
      }, 5000);
    }
  };
  return (
    <div>
      {succeeded ? (
        <article>
          <h2>Thank you</h2>
          <h3>Your payment was successful!</h3>
          <h4>
            <Link to="/">Back to Home</Link>
          </h4>
        </article>
      ) : (
        <article>
          <h5>Your total is {formatPrice(total_amount + shipping_fee)}</h5>
          <p>The payment system is currently in test mode using Stripe</p>
          <p>Please use the following test card number: 4242 4242 4242 4242</p>
        </article>
      )}
      {!succeeded && (
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button
            disabled={processing || disabled || succeeded}
            type="submit"
            id="submit"
          >
            <span className="button-text">
              {processing ? <div className="spinner" id="spinner" /> : "Pay"}
            </span>
          </button>
          {/* show error when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 2rem;
  text-align: center;
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }

  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    display: block;
    width: 100%;
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
  }

  h5 {
    font-size: 1.5rem;
    text-align: left;
  }

  h3 {
    margin-top: 2rem;
  }
  h4 {
    margin-top: 3rem;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    a {
      color: var(--clr-primary-7);
      font-size: 1.25rem;
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      padding: 0.5rem;
      border-bottom: 2px solid var(--clr-primary-7);
      &:hover {
        color: var(--clr-primary-5);
      }
    }
  }

  p {
    text-align: left;
    font-size: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 0.75rem;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
