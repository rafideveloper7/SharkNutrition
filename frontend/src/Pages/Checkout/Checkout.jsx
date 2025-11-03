import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api";
function Checkout() {
    const navigate = useNavigate();
    const { cartData, setCartData } = useContext(CartContext);

    useEffect(() => {
        if (cartData.length <= 0) {
            navigate("/");
        }
    }, [cartData, navigate]);

    // Total amount
    const total = useMemo(() => {
        return cartData
            .reduce((acc, item) => acc + item?.price * item?.count, 0)
            .toFixed(2);
    }, [cartData]);

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "", 
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Submit form
async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (
        !formData?.name ||
        !formData?.email ||
        !formData?.phone ||
        !formData?.address ||
        !formData?.paymentMethod
    ) {
        alert("Please fill all the fields and select payment method.");
        return;
    }

   
    const orderPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        cartItems: cartData.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            count: item.count,
            flavor: item.flavor || [],
        })),
        totalAmount: total,
    };

    try {
        const response = await createOrder(orderPayload);
        console.log(" Order placed:", response.data);

    
        if (formData.paymentMethod === "cod") {
            setOrderPlaced(true);
        } else if (formData.paymentMethod === "bank") {
            navigate("/bankDetails");
        }

        setCartData([]); 

        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            paymentMethod: "",
        });
    } catch (error) {
        toast.error("Failed to place order!");
        console.error(" Error in order submission:", error);
    }
}


    return (
        <section id="checkout" className="container min-h-[80vh] py-10">
            {!orderPlaced && <h2 className="text-2xl font-bold mb-6 text-blue">Checkout</h2>}

            {orderPlaced ? (
                <div className="text-center py-20">
                    <i className="fa-solid fa-circle-check text-6xl text-green-500 mb-4"></i>
                    <h3 className="text-2xl font-semibold text-white mb-2">
                        Order Placed Successfully 🎉
                    </h3>
                    <p className="text-gray-300">Thank you for shopping with us!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-10">
                    <form
                        onSubmit={handleSubmit}
                        className="shadow-[0_0_5px_#ddd] rounded-xl p-6 flex flex-col gap-4"
                    >
                        <div>
                            <label className="block font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData?.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                                placeholder="Israr Ahmad"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData?.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                                placeholder="israrahmadtech@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData?.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                                placeholder="+92 335 8335803"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData?.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 h-24 outline-none"
                                placeholder="House #, Street, City"
                            ></textarea>
                        </div>

               
                        <div>
                            <label className="block font-medium mb-2">Payment Method</label>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                                <label className="flex items-center gap-2 border border-gray-500 rounded-lg px-4 py-2 cursor-pointer hover:border-blue-400 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="bank"
                                        checked={formData?.paymentMethod === "bank"}
                                        onChange={handleChange}
                                        className="text-blue-500 focus:ring-blue-400"
                                    />
                                    <span className="font-medium">Bank Transfer</span>
                                </label>

                                <label className="flex items-center gap-2 border border-gray-500 rounded-lg px-4 py-2 cursor-pointer hover:border-blue-400 transition">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData?.paymentMethod === "cod"}
                                        onChange={handleChange}
                                        className="text-blue-500 focus:ring-blue-400"
                                    />
                                    <span className="font-medium">Cash on Delivery</span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mt-2"
                        >
                            Place Order
                        </button>
                    </form>

                    <div className="shadow-[0_0_5px_#ddd] rounded-xl p-6 h-fit">
                        <h3 className="text-xl font-semibold mb-4 text-blue">Order Summary</h3>
                        {cartData.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {cartData.map((item) => (
                                    <div
                                        key={item?.productId}
                                        className="flex justify-between items-center border-b pb-2"
                                    >
                                        <p className="font-medium text-gray-400">
                                            {item?.name?.slice(0, 20)}...
                                        </p>
                                        <p className="text-gray-400">
                                            {item?.count} × ${item?.price}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-3 font-semibold text-lg">
                                    <span>Total:</span>
                                    <span className="text-blue">Rs {total}</span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center">Your cart is empty.</p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default Checkout;
