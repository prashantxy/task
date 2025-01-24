import { useState } from "react"
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi"

export default function Navbar({
  activeView,
  setActiveView,
}: {
  activeView: "pos" | "analytics"
  setActiveView: (view: "pos" | "analytics") => void
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <nav className={`transition-all duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} shadow-lg`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold tracking-wide"> POS System</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavButton label="POS" isActive={activeView === "pos"} onClick={() => setActiveView("pos")} />
            <NavButton label="Analytics" isActive={activeView === "analytics"} onClick={() => setActiveView("analytics")} />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-2 mt-4">
            <NavButton label="POS" isActive={activeView === "pos"} onClick={() => { setActiveView("pos"); setIsMenuOpen(false) }} />
            <NavButton label="Analytics" isActive={activeView === "analytics"} onClick={() => { setActiveView("analytics"); setIsMenuOpen(false) }} />
          </div>
        )}
      </div>
    </nav>
  )
}

// Reusable Navigation Button Component
function NavButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-600 text-white shadow-md" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
    >
      {label}
    </button>
  )
}
