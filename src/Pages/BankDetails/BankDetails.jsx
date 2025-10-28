import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function BankDetails() {
    const { cartData } = useContext(CartContext);

    return (
        <section className=" text-gray-200 py-10 px-4 md:px-10">
            <div className="max-w-3xl mx-auto bg-[#111] shadow-[0_0_25px_rgba(55,181,254,0.2)] rounded-2xl p-8 border border-[#222]">
                
                {/* Heading */}
                <h2 className="text-3xl font-bold text-center mb-8">
                    <span className="text-[#37b5fe]">Bank</span> Transfer Details
                </h2>

                {/* Bank Info */}
                <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-6 mb-8 shadow-inner">
                    <p className="text-xl font-semibold text-[#37b5fe] tracking-wide">
                        GOHAR ZAMAN
                    </p>
                    <p className="text-gray-300 mt-2">
                        <span className="font-medium text-gray-400">Meezan Bank</span>
                    </p>
                    <p className="text-gray-300 mt-2">
                        <span className="font-medium text-gray-400">Account Number:</span>{" "}
                        <span className="text-[#37b5fe]">07060109362467</span>
                    </p>
                    <p className="text-gray-300 mt-2">
                        <span className="font-medium text-gray-400">IBAN:</span>{" "}
                        <span className="text-[#37b5fe]">PK19MEZN0007060109362467</span>
                    </p>
                </div>

                {/* Product Summary */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[#37b5fe] mb-3">
                        Your Ordered Products
                    </h3>
                    {cartData && cartData.length > 0 ? (
                        <div className="space-y-3">
                            {cartData.map((item) => (
                                <div
                                    key={item?.productId}
                                    className="flex justify-between items-center border-b border-[#1f1f1f] pb-2"
                                >
                                    <p className="text-gray-200 font-medium">
                                        {item?.name?.slice(0, 25)}...
                                    </p>
                                    <p className="text-gray-400 text-sm">
                                        {item?.count} × Rs {item?.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            No products found in your cart.
                        </p>
                    )}
                </div>

                {/* WhatsApp Note */}
                <div className="bg-[#002b1f]/70 border border-[#006b4c] rounded-xl p-5 mb-6">
                    <p className="text-[#58ffbf] font-medium mb-2">
                        📸 Kindly send us a screenshot of your successful payment transaction on our
                        WhatsApp:
                    </p>
                    <p className="text-[#58ffbf] text-lg font-semibold">
                        <a
                            href="https://wa.me/923302721777"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#37b5fe] transition"
                        >
                            0330-2721777
                        </a>
                    </p>
                    <p className="text-[#58ffbf] mt-2 text-sm">
                        for quick payment verification.
                    </p>
                </div>

                {/* Warning Note */}
                <div className="bg-[#2b1f00]/60 border border-[#705a00] rounded-xl p-5">
                    <p className="text-yellow-400 font-medium leading-relaxed">
                        ⚠️ <span className="font-semibold">Note:</span> Please make a single-frame
                        video while opening your parcel and product to avoid any inconvenience.
                    </p>
                </div>
            </div>
        </section>
    );
}
