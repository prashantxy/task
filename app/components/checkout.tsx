import { useState } from "react"
import type { CartItem, Customer, Transaction } from "../page"

interface Props {
  customer: Customer | null
  cart: CartItem[]
  totalAmount: number
  onCheckoutComplete: (transaction: Transaction) => void
  isCustomerRequired: boolean
}

const Checkout = ({ customer, cart, totalAmount, onCheckoutComplete, isCustomerRequired }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")

  const handleCheckout = () => {
    if (isCustomerRequired && !customer) {
      alert("Customer information is required to complete the checkout.")
      return
    }

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      const transaction: Transaction = {
        id: Date.now().toString(),
        customer: customer || {
          id: "guest",
          name: "Guest",
          email: "guest@example.com",
          phone: "N/A",
        },
        items: cart,
        totalAmount,
        date: new Date(),
      }
      onCheckoutComplete(transaction)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p className="mb-4">Total Amount: ${totalAmount.toFixed(2)}</p>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="mr-2"
            />
            Cash
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="mr-2"
            />
            Card
          </label>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0 || isProcessing || (isCustomerRequired && !customer)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:bg-gray-400 w-full"
      >
        {isProcessing ? "Processing..." : "Complete Purchase"}
      </button>
      {cart.length === 0 && <p className="text-red-500 mt-2">Please add items to your cart.</p>}
      {isCustomerRequired && !customer && <p className="text-red-500 mt-2">Please add customer details.</p>}
    </div>
  )
}

export default Checkout

