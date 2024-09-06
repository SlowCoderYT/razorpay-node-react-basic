// src/PaymentHistory.js
import React from 'react';

const payments = [
  { id: 1, date: '2024-09-01', description: 'Product Purchase', amount: 99.99, status: 'Completed' },
  { id: 2, date: '2024-08-28', description: 'Service Subscription', amount: 49.99, status: 'Pending' },
  { id: 3, date: '2024-08-25', description: 'Gift Card Purchase', amount: 25.00, status: 'Completed' },
  { id: 4, date: '2024-08-20', description: 'Product Purchase', amount: 149.99, status: 'Failed' },
];

const PaymentHistory = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Date</th>
              <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Description</th>
              <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Amount</th>
              <th className="py-2 px-4 bg-gray-100 border-b text-left text-gray-600 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{payment.date}</td>
                <td className="py-2 px-4 border-b">{payment.description}</td>
                <td className="py-2 px-4 border-b">${payment.amount.toFixed(2)}</td>
                <td className={`py-2 px-4 border-b ${payment.status === 'Completed' ? 'text-green-500' : payment.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
