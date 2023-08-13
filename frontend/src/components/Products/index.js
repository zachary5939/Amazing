import * as productActions from '../../store/products';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './products.css';

function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.allProducts);
    const { categoryId } = useParams();
    const normalizedProducts = Object.values(products || {});

    useEffect(() => {
        if (categoryId) {
            dispatch(productActions.fetchProductsByCategory(categoryId));
        } else {
            dispatch(productActions.fetchAllProducts());
        }
    }, [dispatch, categoryId]);

    const getCategoryName = (categoryId) => {
      switch (categoryId) {
          case '1': return 'Electronics';
          case '2': return 'Entertainment';
          case '3': return 'Home Goods';
          case '4': return 'Grocery';
          default: return 'All Products';
      }
  }

  return (
    <div>
        <h2 className='category-name'>{getCategoryName(categoryId)}</h2>
        <div className="products-container">
            {normalizedProducts.map((product) => (
                <div key={product.id} className="product-item">
                    <Link to={`/products/${product.id}`}>
                        <img src={product.imageUrl} alt={product.name} />
                    </Link>
                    <div className="product-details">
                        <h3 className="product-name">
                            <Link to={`/products/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className='description'>{product.description}</p>
                        <p className="review-placeholder">Reviews will appear here</p>
                        <p className="product-price">Price: ${product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Products;
