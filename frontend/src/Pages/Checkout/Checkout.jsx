import { useContext, useEffect, useMemo, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../api";
import { toast } from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE;

// ← Change this one line if you want to use a different email address later
const NOTIFICATION_EMAIL = "codeexperts.org@gmail.com";

function Checkout() {
  const navigate = useNavigate();
  const { cartData, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (cartData.length <= 0) {
      navigate("/");
    }
  }, [cartData.length, navigate]);

  useEffect(() => {
    if (!orderPlaced) return;

    const timer = setTimeout(() => {
      clearCart();
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderPlaced]);

  const total = useMemo(() => {
    return cartData
      .reduce((acc, item) => acc + item?.discountedPrice * item?.count, 0)
      .toFixed(2);
  }, [cartData]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
    couponCode: "",
  });

  const [discount, setDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ type: "", text: "" });

  const finalTotal = (total - discount).toFixed(2);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "couponCode") {
      setCouponMessage({ type: "", text: "" });
      setDiscount(0);
    }
  }

  async function applyCoupon() {
    if (!formData.couponCode.trim()) {
      return toast.error("Please enter a coupon code.");
    }
    setIsApplyingCoupon(true);
    setCouponMessage({ type: "", text: "" });
    try {
      const res = await fetch(`${API_BASE}/api/coupons/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: formData.couponCode, cartTotal: total }),
      });
      const data = await res.json();
      if (data.success) {
        setDiscount(data.discount);
        setCouponMessage({
          type: "success",
          text: `Discount of Rs. ${data.discount.toFixed(2)} applied!`,
        });
        toast.success("Coupon applied successfully!");
      } else {
        setDiscount(0);
        setCouponMessage({
          type: "error",
          text: data.error || "Invalid coupon code!",
        });
        toast.error(data.error || "Invalid coupon code!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply coupon.");
    } finally {
      setIsApplyingCoupon(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.paymentMethod
    ) {
      toast.error("Please fill all the fields and select payment method.");
      return;
    }

    const orderPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      couponCode: formData.couponCode,
      totalAmount: finalTotal,
      cartItems: cartData.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        count: item.count,
        flavor: item.flavor,
        servings: item.servings,
      })),
    };

    if (formData.couponCode.trim()) {
      orderPayload.couponCode = formData.couponCode;
      orderPayload.discount = discount;
    }

    try {
      const responseData = await createOrder(orderPayload);

      // console.log("Backend response:", responseData);

      let orderId = "—";
      if (responseData && typeof responseData === "object") {
        orderId =
          responseData._id ||
          responseData.id ||
          (responseData.order && responseData.order._id) ||
          (responseData.data && responseData.data._id) ||
          (responseData.createdOrder && responseData.createdOrder._id) ||
          "—";
      }

      const emailData = {
        _subject: `New Order - ${formData.name} (${formData.paymentMethod.toUpperCase()})`,
        _replyto: formData.email,

        "Order ID": orderId,
        "Customer Name": formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Address: formData.address,
        "Payment Method":
          formData.paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer",
        "Coupon Code": formData.couponCode || "—",
        Subtotal: `Rs ${total}`,
        Discount: discount > 0 ? `Rs ${discount.toFixed(2)}` : "Rs 0.00",
        Delivery: "Rs 300",
        "Final Total": `Rs ${(Number(total) + 300 - discount).toFixed(2)}`,

        Items:
          cartData
            .map((item, i) => {
              let line = `${i + 1}. ID: ${item._id || item.productId || "—"}  ${item.name}`;
              if (item.flavor) line += ` (${item.flavor})`;
              if (item.servings) line += ` (${item.servings})`;
              line += ` × ${item.count} = Rs ${(item.discountedPrice * item.count).toFixed(2)}`;
              return line;
            })
            .join("\n") || "No items",
      };

      // Send to FormSubmit – using the constant email
      fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(emailData),
      })
        .then((res) => {
          console.log("FormSubmit status:", res.status);
          return res.json();
        })
        .catch((err) => {
          console.warn("FormSubmit send failed:", err);
        });

      if (formData.paymentMethod === "cod") {
        setOrderPlaced(true);
      } else if (formData.paymentMethod === "bank") {
        navigate("/bankDetails");
      }

      // Proper reset – all fields as empty strings
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "",
        couponCode: "",
      });

      setDiscount(0);
      setCouponMessage({ type: "", text: "" });

      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to place order!"
      );
    }
  }

  return (
    <section id="checkout" className="container min-h-[80vh] py-10">
      {!orderPlaced && (
        <h2 className="text-2xl font-bold mb-6 text-blue">Checkout</h2>
      )}

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
          {/* LEFT SIDE FORM */}
          <form
            onSubmit={handleSubmit}
            className="shadow-[0_0_5px_#ddd] rounded-xl p-6 flex flex-col gap-4"
          >
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                placeholder="Jone Doe"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                placeholder="example@gmail.com"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                placeholder="03000000000"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 h-24 outline-none"
                placeholder="House #, Street, City"
              ></textarea>
            </div>

            {/* COUPON CODE FIELD */}
            <div>
              <label className="block font-medium mb-1">CODE:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  placeholder="Enter code here"
                  className="w-full border border-gray-300 focus:border-blue-400 placeholder:text-gray-500 rounded-md px-3 py-2 outline-none"
                />

                <button
                  type="button"
                  onClick={applyCoupon}
                  disabled={isApplyingCoupon}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-md disabled:bg-gray-500"
                >
                  {isApplyingCoupon ? "..." : "Apply"}
                </button>
              </div>
              {couponMessage.text && (
                <p
                  className={`text-sm mt-2 ${
                    couponMessage.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2">Payment Method</label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <label className="flex items-center gap-2 border border-gray-500 rounded-lg px-4 py-2 cursor-pointer hover:border-blue-400 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === "bank"}
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
                    checked={formData.paymentMethod === "cod"}
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

          {/* RIGHT SIDE ORDER SUMMARY */}
          <div className="shadow-[0_0_5px_#ddd] rounded-xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-blue">Order Summary</h3>

            {cartData.length > 0 ? (
              <div className="flex flex-col gap-4">
                {cartData.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <p className="font-medium text-gray-400">
                      {item?.name?.slice(0, 20)}...
                    </p>
                    <p className="text-gray-400">
                      {item?.count} × RS{item?.discountedPrice}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between pt-3 font-semibold text-lg">
                  <span>Total:</span>
                  <span className="text-blue">Rs {total}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between pt-2 text-green-400 font-semibold">
                    <span>Discount:</span>
                    <span>- Rs {discount}</span>
                  </div>
                )}

                <div className="flex justify-between pt-3 font-semibold text-lg">
                  <span>Delivery:</span>
                  <span className="text-blue">Rs 300</span>
                </div>

                <div className="flex justify-between pt-3 font-semibold text-lg">
                  <span>Final Total:</span>
                  <span className="text-blue">
                    Rs {300 + Number(finalTotal)}
                  </span>
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