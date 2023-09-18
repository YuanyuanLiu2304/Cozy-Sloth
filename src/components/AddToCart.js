import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import { FaPlus, FaMinus } from "react-icons/fa";
const AddToCart = ({ product }) => {
  const { id, colors, stock } = product;
  const [amount, setAmount] = useState(1);
  const [selectColor, setSelectColor] = useState(colors[0]);
  const { addToCart } = useCartContext();
  return (
    <Wrapper>
      <div className="colors">
        <span>Colors: </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`${
                  selectColor === color ? "color-btn active" : "color-btn"
                }`}
                style={{ background: color }}
                onClick={() => setSelectColor(color)}
              >
                {selectColor === color && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <button onClick={() => setAmount(amount > 1 ? amount - 1 : 1)}>
          <FaMinus />
        </button>
        <button>
          <h3>{amount}</h3>
        </button>
        <button onClick={() => setAmount(amount < stock ? amount + 1 : amount)}>
          <FaPlus />
        </button>
      </div>
      <Link to="/cart">
        <button
          type="button"
          className="btn"
          onClick={() => addToCart(id, amount, selectColor, product)}
        >
          add to cart
        </button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }

  .btn-container {
    margin-top: 2rem;
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

  .btn {
    margin-top: 1.25rem;
    width: 140px;
  }
`;
export default AddToCart;
