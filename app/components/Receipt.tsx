import type { CartItem, Customer, Service } from "../page"

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
    <div className="border p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Receipt</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Customer Details</h3>
        <p>Name: {customer?.name}</p>
        <p>Email: {customer?.email}</p>
        <p>Phone: {customer?.phone}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Purchased Services</h3>
        <ul className="divide-y">
          {cart.map((item) => (
            <li key={item.id} className="py-2 flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%):</span>
          <span>${(totalAmount * 0.1).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total:</span>
          <span>${(totalAmount * 1.1).toFixed(2)}</span>
        </div>
      </div>
      <p className="mb-4 text-green-600 text-center">Thank you for your purchase! We hope to see you again soon.</p>
      <p className="text-sm text-gray-500 text-center mb-4">{new Date().toLocaleString()}</p>
      <button
        onClick={onNewSale}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        New Sale
      </button>
    </div>
  )
}

