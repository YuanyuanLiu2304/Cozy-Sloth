import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import { CartContent, PageHero } from "../components";

const CartPage = () => {
  const { carts } = useCartContext();

  return (
    <main>
      <PageHero title="cart" />
      {carts.length < 1 ? (
        <Wrapper className="page-100">
          <div className="empty">
            <h2>Your cart is Empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        </Wrapper>
      ) : (
        <Wrapper className="page">
          <CartContent />
        </Wrapper>
      )}
    </main>
  );
};

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin: 3rem 0;
      text-transform: none;
    }
  }
`;

export default CartPage;
