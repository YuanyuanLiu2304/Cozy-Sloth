import { useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(url + id);
  }, [id]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);

  const {
    name,
    price,
    images,
    stars,
    stock,
    description,
    company,
    reviews,
    id: SKU,
  } = product;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />

          <section className="content">
            <h2>{name}</h2>

            <div className="star-reviews">
              {Array.from({ length: 5 }, (_, index) => {
                return (
                  <span key={index} className="stars">
                    {stars >= index + 1 ? (
                      <BsStarFill />
                    ) : stars >= index + 0.5 ? (
                      <BsStarHalf />
                    ) : (
                      <BsStar />
                    )}
                  </span>
                );
              })}
              <span className="reviews">({reviews} customer reviews)</span>
            </div>

            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available: </span>
              {stock > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>SKU: </span>
              {SKU}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }

  .star-reviews {
    margin-bottom: 0.5rem;
  }

  .stars {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }

  .reviews {
    margin-left: 0.5rem;
  }

  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProduct;
