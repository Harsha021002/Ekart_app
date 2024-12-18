import './Productlist.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from '../auth/Autentication';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import React from 'react';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(0); 
    const { user } = useAuth();

    async function addToCart() {
        if (!user) {
            toast.warn("Please login before adding.");
            return;
        }

        if (quantity < 1) {
            toast.warn("Quantity must be at least 1.");
            return;
        }

        const body = {
            userId: user.id,
            products: [
                {
                    id: id,
                    quantity: quantity,
                }
            ]
        };

        try {
            const response = await axios.post('https://dummyjson.com/carts/add', body);
            console.log("Add to Cart Response:", response.data);
            toast.success("Item added to cart");

            // Optionally, refetch the updated cart here if needed
        } catch (err) {
            toast.error("Error while adding to cart");
        }
    }

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
                setLoading(false);
            });
    }, [id]);

    return (
        <>
            <ToastContainer />
            <h1 className="heading">Product Page</h1>
            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="Block">
                        <div className="Block1">
                        <img src={product.thumbnail} alt={product.title} className="Image" />
                        <div className="Details">
                            <h2>{product.title}</h2>
                            <h3 className="Price">Price: ${product.price}</h3>
                            <p>{product.description}</p>
                            <div className="QuantityControls">
                                
                                <button
                                    className="productbutton"
                                    aria-label="Decrease quantity"
                                    onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>

                                <span className="Quantity">{quantity}</span>

                                <button
                                    className="productbutton"
                                    aria-label="Increase quantity"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="productbutton"
                                onClick={addToCart}
                                aria-label="Add to Cart"
                            >
                                Add to Cart
                            </button>
                            </div>
                        </div>
                    </div>
                )
            }</>
    );
}

export default Product;
