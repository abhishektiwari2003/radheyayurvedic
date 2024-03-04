import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [orderID, setOrderID] = useState(""); // Store the Razorpay order ID

  // Calculate the total price of items in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart?.map((item) => {
      total += item.price;
    });
    return total;
  };

  // Function to handle placing the order
  const placeOrder = async () => {
    // Calculate the total amount for the Razorpay order
    const totalAmount = calculateTotalAmount();

    try {
      // Create Razorpay order
      const options = {
        key: "rzp_test_R5alK5cgTgkRz0",
        amount: totalAmount * 100, // Amount in smallest currency unit (paise)
        currency: "INR",
        order_id: orderID,
        name: "Radhey Ayurvedic Enterprises",
        description: "Purchase Description",
        image: "Your Company Logo URL",
        handler: async function (response) {
          // console.log("Request Body:", {
          //   products: cart,
          //   buyer: auth?.user?._id,
          // });

          // console.log("User:", auth?.user);

          // console.log(auth?.user._id);
          // console.log(response);

          if (response.razorpay_payment_id) {
            // Payment successful, store the order in the database
            try {
              // Send a request to your server to create and store the order
              const orderResponse = await fetch(
                `${process.env.REACT_APP_API}/api/v1/product/create-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.token}`,
                  },
                  body: JSON.stringify({
                    products: cart,
                    buyer: auth?.user?._id,
                    payment: {
                      response,
                    },
                  }),
                }
              );

              if (orderResponse.ok) {
                const orderData = await orderResponse.json();
                // Order has been successfully stored, clear the cart and orderID
                setCart([]);
                setOrderID("");

                // Redirect to the order history page
                navigate("/dashboard/user/orders");
                alert("Payment successful! Order has been placed.");
              } else {
                console.error("Error storing the order");
                alert(
                  "Payment successful, but there was an issue placing the order."
                );
              }
            } catch (error) {
              console.error("Error storing the order", error);
              alert(
                "Payment successful, but there was an issue placing the order."
              );
            }
          } else {
            // Payment failed or was canceled
            console.error("Payment failed/cancelled:", response);
            alert("Payment failed. Please retry the payment.");
          }
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating Razorpay order", error);
    }
  };

  // ... (remaining code)

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to remove an item from the cart
  const removeCartItem = (productId) => {
    try {
      let updatedCart = cart.filter((item) => item._id !== productId); // Remove the item from the cart

      setCart(updatedCart); // Update the cart state
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update the local storage

      // Clear the order ID if any
      setOrderID("");
    } catch (error) {
      console.error("Error removing item from the cart", error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : Rs {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
                {cart?.length > 0 && (
                  <button className="btn btn-success" onClick={placeOrder}>
                    Place Order
                  </button>
                )}
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
