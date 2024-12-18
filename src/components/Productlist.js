import { useEffect, useState } from "react";
import './Productlist.css';
import { Link } from 'react-router-dom';
import React from 'react';
function Productlist(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="product-list">
            <h2>Product List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        
                        <div key={product.id} className="product-card">
                            <img src={product.thumbnail} alt={product.title} className="product-image" />
                            <Link to={`/p/${product.id}`}><h3>{product.title}</h3></Link>
                            <p className="product-price">${product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Productlist;