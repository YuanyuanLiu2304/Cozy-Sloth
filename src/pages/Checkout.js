import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { carts } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page-100">
        {carts.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: grid;
  justify-content: center;

  .empty {
    text-align: center;
    h2 {
      margin: 3rem 0;
      text-transform: none;
    }
  }
`;
export default CheckoutPage;
