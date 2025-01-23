export default function Navbar({
    activeView,
    setActiveView,
  }: {
    activeView: "pos" | "analytics"
    setActiveView: (view: "pos" | "analytics") => void
  }) {
    return (
      <nav className="bg-gray-800 text-white mb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">POS System</span>
            </div>
            <div className="flex">
              <button
                onClick={() => setActiveView("pos")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === "pos" ? "bg-gray-900" : "hover:bg-gray-700"
                }`}
              >
                POS
              </button>
              <button
                onClick={() => setActiveView("analytics")}
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium ${
                  activeView === "analytics" ? "bg-gray-900" : "hover:bg-gray-700"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
  
  