import * as productActions from '../../store/products';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const normalizedProducts =
      products && products.allProducts ? Object.values(products.allProducts) : [];

    console.log("normalizedProducts:", normalizedProducts)
    console.log("state", products)

    useEffect(() => {
        dispatch(productActions.fetchAllProducts());
    }, [dispatch]);

    return (
        <div>
            <h2>All Products</h2>
            <ul>
                {normalizedProducts.map(product => (
                    <li key={product.id}>
                        <div>
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price.toFixed(2)}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
