import React, { useEffect, useState } from "react";
import { useAuth } from '../auth/Autentication';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const { user } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            toast.warn("Please login to view your cart.");
            setLoading(false);
            return;
        }
    
        fetch(`https://dummyjson.com/carts/user/{user.id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Cart Data:", data);
                if (data && data.products) {
                    setCart(data);
                } else {
                    setCart({ products: [] });
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
                toast.error("Error fetching cart details.");
                setLoading(false);
            });
    }, [user]);
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Sorry for the inconvenience,this is a fake API so it wont show cart items/products which you have added</p>;
    }

    return (
        <>
            <ToastContainer />
            <h1>Your Cart</h1>
            <div className="cart">
                {cart.products.map((product) => (
                    <div key={product.id} className="cart-item">
                        <img src={product.thumbnail} alt={product.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{product.title}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Total: ${product.total}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cart;
