import axios from 'axios';
import React from 'react';

const amount = 100;

const Product = () => {

    const handleClick = async () => {
        try {
            // Create an order
            const orderResponse = await axios.post('http://localhost:5000/api/create-orderId', {
                amount: amount,
                receipt: 'receipt_order_1',
            });

            const { id } = orderResponse.data.order;

            // Initiate Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RZP_KEY, // Replace with your Razorpay Key ID
                amount: amount,
                currency: 'INR',
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id: id,
                handler: async (response) => {
                    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
                    // Handle payment success
                    // alert("Payment Done")
                    console.log("Response of payment", response)
                    const verifyResponse = await axios.post('http://localhost:5000/api/verify-payment', {
                        razorpay_order_id, razorpay_payment_id, razorpay_signature
                    });
                    if (verifyResponse.data.success) {
                        alert('Payment verified successfully');
                    } else {
                        alert('Payment verification failed');
                    }
                },
                prefill: {
                    name: 'Your Name',
                    email: 'yourname@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment');
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
                <img
                    src="https://img.freepik.com/free-photo/cosmetic-tubes_1385-2778.jpg"
                    alt="Product"
                    className="w-full h-64 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Title</h2>
                    <p className="text-gray-600 mb-4">
                        This is a brief description of the product. It highlights the main features and benefits that the product offers.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xl font-semibold text-gray-800">₹ {amount}</span>
                        <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
