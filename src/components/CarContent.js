import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const { clearCart, carts } = useCartContext();
  return (
    <Wrapper className="section section-center">
      {/* cart header column */}
      <div className="cart-header">
        <div className="content">
          <h5>item</h5>
          <h5>price</h5>
          <h5>quantity</h5>
          <h5>subtotal</h5>
          <span></span>
        </div>
        <hr />
      </div>
      {/* cart items */}
      {carts.map((item) => {
        return <CartItem key={item.id} {...item} />;
      })}

      {/* link buttons */}
      <div className="link-container">
        <Link to="/products">
          <button className="link-btn">continue shopping</button>
        </Link>
        <button
          type="button"
          className="clear-btn link-btn"
          onClick={clearCart}
        >
          clear cart
        </button>
      </div>
      {/* display total carts info */}
      <CartTotals />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .cart-header {
    display: none;
    @media (min-width: 776px) {
      display: block;
      .content {
        display: grid;
        grid-template-columns: 316px 1fr 1fr 1fr auto;
        justify-items: center;
        column-gap: 1rem;
        h5 {
          color: var(--clr-grey-5);
          font-weight: 400;
        }
      }

      span {
        text-transform: capitalize;
        width: 2rem;
        height: 2rem;
      }
      hr {
        margin-top: 1rem;
        margin-bottom: 3rem;
      }
    }
  }
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
