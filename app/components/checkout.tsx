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
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-2xl -mx-6 -mt-6 p-6 mb-6">
        <h2 className="text-3xl font-bold">Checkout</h2>
        <p className="text-xl font-semibold mt-2">Total: ${totalAmount.toFixed(2)}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
          <div className="flex space-x-4">
            {["cash", "card"].map((method) => (
              <label 
                key={method} 
                className={`
                  flex items-center px-4 py-2 rounded-lg cursor-pointer 
                  transition-all duration-300
                  ${paymentMethod === method 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  }
                `}
              >
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method as "cash" | "card")}
                  className="mr-2 hidden"
                />
                <span className="capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || isProcessing || (isCustomerRequired && !customer)}
          className="
            w-full py-3 rounded-lg text-white font-semibold 
            transition-all duration-300
            flex items-center justify-center space-x-2
            ${cart.length === 0 || isProcessing || (isCustomerRequired && !customer)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
            }
          "
        >
          {isProcessing ? (
            <>
              <svg 
                className="animate-spin h-5 w-5 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            "Complete Purchase"
          )}
        </button>

        {(cart.length === 0 || (isCustomerRequired && !customer)) && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            {cart.length === 0 && (
              <p className="text-red-700">Please add items to your cart.</p>
            )}
            {isCustomerRequired && !customer && (
              <p className="text-red-700">Please add customer details.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout