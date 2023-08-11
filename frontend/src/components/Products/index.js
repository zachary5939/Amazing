import * as productActions from '../../store/products';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const { categoryId } = useParams();
    const normalizedProducts =
      products && products.allProducts ? Object.values(products.allProducts) : [];

    console.log("normalizedProducts:", normalizedProducts)
    console.log("state", products)

    useEffect(() => {
        if (categoryId) {
            dispatch(productActions.fetchProductsByCategory(categoryId));
        } else {
            dispatch(productActions.fetchAllProducts());
        }
    }, [dispatch, categoryId]);

    return (
        <div>
          <h2>All Products</h2>
          <ul>
            {normalizedProducts.map((product) => (
              <li key={product.id}>
                <div>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} alt={product.name} />
                  </Link>
                </div>
                <div>
                  <h3>
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

export default Products;
