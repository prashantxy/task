import type { CartItem, Customer } from "../page"

export default function Receipt({
  cart,
  customer,
  totalAmount,
  onNewSale,
}: {
  cart: CartItem[]
  customer: Customer | null
  totalAmount: number
  onNewSale: () => void
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl mx-auto">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-2xl -mx-6 -mt-6 p-6 mb-6 text-center">
        <h2 className="text-3xl font-bold">Receipt</h2>
      </div>

      {/* Customer Details */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold">Customer Details</h3>
        <p className="text-gray-700">Name: {customer?.name || "Guest"}</p>
        <p className="text-gray-700">Email: {customer?.email || "N/A"}</p>
        <p className="text-gray-700">Phone: {customer?.phone || "N/A"}</p>
      </div>

      {/* Purchased Services */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Purchased Services</h3>
        <ul className="divide-y">
          {cart.map((item) => (
            <li key={item.id} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-500 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary Section */}
      <div className="mb-6 border-t pt-4 text-gray-800">
        <div className="flex justify-between text-lg">
          <span>Subtotal:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>Tax (10%):</span>
          <span>${(totalAmount * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-2xl mt-4">
          <span>Total:</span>
          <span>${(totalAmount * 1.1).toFixed(2)}</span>
        </div>
      </div>

      {/* Thank You Message */}
      <p className="mb-6 text-green-600 text-center text-lg font-semibold">
        Thank you for your purchase! We hope to see you again soon.
      </p>
      <p className="text-sm text-gray-500 text-center mb-6">
        {new Date().toLocaleString()}
      </p>

      {/* New Sale Button */}
      <button
        onClick={onNewSale}
        className="w-full py-3 rounded-lg text-white font-semibold text-lg 
          transition-all duration-300 bg-gradient-to-r from-purple-500 to-indigo-600 
          hover:from-purple-600 hover:to-indigo-700 shadow-md"
      >
        New Sale
      </button>
    </div>
  )
}
