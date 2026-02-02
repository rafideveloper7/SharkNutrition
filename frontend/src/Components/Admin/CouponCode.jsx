import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/Components/ui/button";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function CouponCode() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    
    const initialFormData = {
        code: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        usageLimit: 0,
        minPurchase: 0,
    };
    const [formData, setFormData] = useState(initialFormData);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/coupons`, { credentials: "include" });
            const data = await res.json();
            if (data.success) {
                setCoupons(data.coupons);
            } else {
                toast.error(data.error || "Failed to fetch coupons.");
            }
        } catch (err) {
            toast.error("An error occurred while fetching coupons.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const openAddModal = () => {
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(`${API_BASE}/api/coupons`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                toast.success("Coupon created successfully!");
                setIsModalOpen(false);
                fetchCoupons(); // Refresh the list
            } else {
                toast.error(data.error || "Failed to create coupon.");
            }
        } catch (err) {
            toast.error("An error occurred.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteCoupon = (id) => {
        toast(
          (t) => (
            <div className="flex flex-col gap-2">
              <p className="text-black">Are you sure you want to delete this coupon?</p>
              <div className="flex gap-2">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white w-full"
                  onClick={() => {
                    toast.dismiss(t.id);
                    confirmDelete(id);
                  }}
                >
                  Delete
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white w-full" onClick={() => toast.dismiss(t.id)}>
                  Cancel
                </Button>
              </div>
            </div>
          ),
          { duration: 6000 }
        );
    };

    const confirmDelete = (id) => {
        const deletePromise = fetch(`${API_BASE}/api/coupons/${id}`, {
            method: "DELETE",
            credentials: "include",
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Failed to delete");
            fetchCoupons();
        });
        toast.promise(deletePromise, {
            loading: "Deleting coupon...",
            success: "Coupon deleted successfully!",
            error: (err) => err.toString(),
        });
    };

    const getDiscountText = (coupon) => {
        if (coupon.discountType === 'percentage') {
            return `${coupon.discountValue}%`;
        }
        return `Rs. ${coupon.discountValue}`;
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Coupon Codes</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md"
                >
                    + Add Coupon
                </button>
            </div>

            {/* Coupons List */}
            {loading ? (
                <p className="text-white text-center">Loading coupons...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coupons.map((coupon) => (
                        <div
                            key={coupon._id}
                            className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-blue-500/20 transition flex flex-col gap-3 border border-gray-700"
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold text-blue-400">{coupon.code}</h3>
                                <p className="text-lg font-bold text-white">{getDiscountText(coupon)}</p>
                            </div>
                            <div className="text-sm text-gray-400 space-y-1">
                                <p>Expires on: {new Date(coupon.expiryDate).toLocaleDateString('en-GB')}</p>
                                {coupon.minPurchase > 0 && <p>Min Purchase: Rs. {coupon.minPurchase}</p>}
                                {coupon.usageLimit > 0 && <p>Usage: {coupon.usedCount}/{coupon.usageLimit}</p>}
                            </div>
                            <div className="flex gap-2 mt-auto pt-3">
                                <button
                                    onClick={() => handleDeleteCoupon(coupon._id)}
                                    className="w-full px-2 py-1 bg-red-500/80 text-white rounded hover:bg-red-600 transition text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-lg shadow-lg border border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">
                            Add New Coupon
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-1">Discount Type</label>
                                    <select name="discountType" value={formData.discountType} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500">
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="fixed">Fixed Amount (Rs.)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1">Discount Value</label>
                                    <input type="number" name="discountValue" value={formData.discountValue} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-1">Expiry Date</label>
                                    <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
                                </div>
                               
                                <div>
                                    <label className="block text-gray-300 mb-1">Usage Limit (0 for unlimited)</label>
                                    <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-1">Minimum Purchase (Rs.)</label>
                                <input type="number" name="minPurchase" value={formData.minPurchase} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-500"
                                >
                                    {isSubmitting ? "Adding..." : "Add Coupon"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
