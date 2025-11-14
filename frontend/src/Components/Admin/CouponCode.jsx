import React, { useState } from "react";

export default function CouponCode() {
    const [coupons, setCoupons] = useState([
        { id: 1, code: "WELCOME10", discount: "10%" },
        { id: 2, code: "FESTIVE20", discount: "20%" },
        { id: 3, code: "NEWUSER5", discount: "5%" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [formData, setFormData] = useState({ code: "", discount: "" });

    const openAddModal = () => {
        setEditingCoupon(null);
        setFormData({ code: "", discount: "" });
        setIsModalOpen(true);
    };

    const openEditModal = (coupon) => {
        setEditingCoupon(coupon);
        setFormData({ code: coupon.code, discount: coupon.discount });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingCoupon) {
            // Edit existing coupon
            setCoupons(
                coupons.map((c) =>
                    c.id === editingCoupon.id ? { ...c, ...formData } : c
                )
            );
        } else {
            // Add new coupon
            setCoupons([
                ...coupons,
                { id: Date.now(), code: formData.code, discount: formData.discount },
            ]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteCoupon = (id) => {
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            setCoupons(coupons.filter((c) => c.id !== id));
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Coupon Codes</h2>
                <button
                    onClick={openAddModal}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    + Add Coupon
                </button>
            </div>

            {/* Coupons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition flex flex-col gap-3"
                    >
                        <h3 className="text-lg font-semibold text-white">{coupon.code}</h3>
                        <p className="text-gray-300">Discount: {coupon.discount}</p>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => openEditModal(coupon)}
                                className="flex-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteCoupon(coupon.id)}
                                className="flex-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingCoupon ? "Edit Coupon" : "Add Coupon"}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    value={formData.code}
                                    onChange={(e) =>
                                        setFormData({ ...formData, code: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">Discount</label>
                                <input
                                    type="text"
                                    value={formData.discount}
                                    onChange={(e) =>
                                        setFormData({ ...formData, discount: e.target.value })
                                    }
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                                    placeholder="e.g., 10%"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    {editingCoupon ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
