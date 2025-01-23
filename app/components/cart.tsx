import type { CartItem } from "../page"

interface CartProps {
  cart: CartItem[]
  updateCartItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export default function Cart({ cart, updateCartItemQuantity, clearCart }: CartProps) {
  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="text-2xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  )
}
