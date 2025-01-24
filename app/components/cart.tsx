import type { CartItem } from "../page"

interface CartProps {
  cart: CartItem[]
  updateCartItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export default function Cart({ cart, updateCartItemQuantity, clearCart }: CartProps) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md mx-auto">
      <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>
        <span className="text-gray-600 font-medium">
          {cart.length} {cart.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-20 w-20 mx-auto text-gray-300 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
          <p className="text-xl text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="
                      w-8 h-8 rounded-full 
                      bg-gray-200 hover:bg-gray-300 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center justify-center
                      transition-colors
                    "
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="
                      w-8 h-8 rounded-full 
                      bg-gray-200 hover:bg-gray-300 
                      flex items-center justify-center
                      transition-colors
                    "
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold text-green-600">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="p-4 bg-white border-t border-gray-200">
            <button
              onClick={clearCart}
              className="
                w-full py-3 rounded-lg 
                bg-red-500 hover:bg-red-600 
                text-white font-semibold 
                transition-colors 
                flex items-center justify-center 
                space-x-2
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              <span>Clear Cart</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}