import { FaPlus, FaMinus } from "react-icons/fa";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { formatPrice } from "../utils/helpers";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
const CartItem = ({
  id,
  productId,
  name,
  image,
  color,
  price,
  amount,
  max,
}) => {
  const { removeCartItem, toggleItemAmount } = useCartContext();
  const [selectAmount, setSelectAmount] = useState(amount);

  useEffect(() => {
    toggleItemAmount(id, selectAmount);
    // eslint-disable-next-line
  }, [selectAmount]);
  return (
    <Wrapper>
      <Link to={`/products/${productId}`}>
        <div className="title">
          <img src={image} alt={name} />
          <div>
            <h5 className="name">{name}</h5>
            <p className="color">
              color: <span style={{ background: color }}></span>
            </p>
            <h5 className="price-small">{formatPrice(price)}</h5>
          </div>
        </div>
      </Link>

      <h5 className="price">{formatPrice(price)}</h5>
      <div className="btn-container">
        <button
          onClick={(e) =>
            setSelectAmount(selectAmount === 0 ? 0 : selectAmount - 1)
          }
        >
          <FaMinus />
        </button>
        <button>
          <h3>{selectAmount}</h3>
        </button>
        <button
          onClick={(e) =>
            setSelectAmount(selectAmount < max ? selectAmount + 1 : max)
          }
        >
          <FaPlus />
        </button>
      </div>
      <h5 className="subtotal">{formatPrice(price * amount)}</h5>
      <button className="remove-btn" onClick={() => removeCartItem(id)}>
        <FaTrash />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;

  .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  .name {
    color: var(--clr-grey-1);
  }

  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }
  .btn-container {
    display: grid;
    width: 140px;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    button {
      background: transparent;
      border-color: transparent;
      cursor: pointer;
      padding: 1rem 0;
      width: 2rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    h3 {
      margin-bottom: 0rem;
    }
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default CartItem;
