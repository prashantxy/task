"use client"

import { useState, useEffect } from "react"
import ServiceSelection from "./components/serviceSelect"
import Cart from "./components/cart"
import CustomerForm from "./components/customerForm"
import Checkout from "./components/checkout"
import Receipt from "./components/Receipt"
import Analytics from "./components/Analytics"
import Navbar from "./components/navbar"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export type Service = {
  id: number
  name: string
  price: number
  category: string
  description: string
}

export type CartItem = Service & { quantity: number }

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
}

export type Transaction = {
  id: string
  customer: Customer
  items: CartItem[]
  totalAmount: number
  date: Date
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [activeView, setActiveView] = useState<"pos" | "analytics">("pos")

  useEffect(() => {
    // Load transactions from local storage
    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions))
    }
  }, [])

  const addToCart = (service: Service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === service.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...service, quantity: 1 }]
    })
    toast.success(`Added ${service.name} to cart`)
  }

  const updateCartItemQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCart([])
    toast.info("Cart cleared")
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckoutComplete = (transaction: Transaction) => {
    setTransactions((prev) => {
      const newTransactions = [
        ...prev,
        {
          ...transaction,
          id: Date.now().toString(),
        },
      ]
      localStorage.setItem("transactions", JSON.stringify(newTransactions))
      return newTransactions
    })
    setIsCheckoutComplete(true)
    clearCart()
  }

  const resetCheckout = () => {
    setIsCheckoutComplete(false)
    setCustomer(null)
  }

  return (
    <main className="container mx-auto p-4">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <ToastContainer position="top-right" autoClose={3000} />
      {activeView === "pos" ? (
        !isCheckoutComplete ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <ServiceSelection addToCart={addToCart} />
              <CustomerForm setCustomer={setCustomer} customer={customer} />
            </div>
            <div>
              <Cart cart={cart} updateCartItemQuantity={updateCartItemQuantity} clearCart={clearCart} />
              <Checkout
                cart={cart}
                customer={customer}
                totalAmount={totalAmount}
                onCheckoutComplete={handleCheckoutComplete}
                isCustomerRequired={true}
              />
            </div>
          </div>
        ) : (
          <Receipt cart={cart} customer={customer} totalAmount={totalAmount} onNewSale={resetCheckout} />
        )
      ) : (
        <Analytics transactions={transactions} />
      )}
    </main>
  )
}

