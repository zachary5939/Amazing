import * as productActions from '../../store/products';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchAllRatings, fetchRatingsForProducts } from "../../store/ratings";
import './products.css';

function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.allProducts);
    const { categoryId } = useParams();
    const normalizedProducts = Object.values(products || {});
    const ratings = useSelector((state) => state.ratings?.items || []);

    useEffect(() => {
        if (categoryId) {
            dispatch(productActions.fetchProductsByCategory(categoryId));
        } else {
            dispatch(productActions.fetchAllProducts());
        }
    }, [dispatch, categoryId]);

    //watch for changes in `products`
    useEffect(() => {
        if (products && Object.keys(products).length) {
            const productIds = normalizedProducts.map(product => product.id);
            dispatch(fetchRatingsForProducts(productIds));
        }
    }, [dispatch, products]);



    const getCategoryName = (categoryId) => {
      switch (categoryId) {
          case '1': return 'Electronics';
          case '2': return 'Entertainment';
          case '3': return 'Home Goods';
          case '4': return 'Grocery';
          default: return 'All Products';
      }
    }

    const getAverageRating = (productId) => {
        const productRatings = ratings.filter(rating => String(rating.productId) === String(productId));
        const total = productRatings.reduce((acc, rating) => acc + rating.rating, 0);
        return productRatings.length ? (total / productRatings.length).toFixed(2) : 'No reviews';
    }


    return (
        <div>
            <h2 className='category-name'>{getCategoryName(categoryId)}</h2>
            <div className="products-container">
                {normalizedProducts.map((product) => (
                    <div key={product.id} className="product-item">
                        <Link to={`/products/${product.id}`}>
                            <img src={product.imageUrl} alt={product?.name} />
                        </Link>
                        <div className="product-details">
                            <h3 className="product-name">
                                <Link to={`/products/${product.id}`}>{product.name}</Link>
                            </h3>
                            <p className='description'>{product.description}</p>
                            <p className="review-placeholder">Average Rating: {getAverageRating(product?.id)}</p>
                            <p className="product-price">Price: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
