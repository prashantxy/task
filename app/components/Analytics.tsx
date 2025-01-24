import { useMemo } from "react"
import type { Transaction } from "../page"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export default function Analytics({ transactions }: { transactions: Transaction[] }) {
  const analyticsData = useMemo(() => {
    const dailyRevenue = transactions.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.date).toLocaleDateString()
        acc[date] = (acc[date] || 0) + transaction.totalAmount
        return acc
      },
      {} as Record<string, number>,
    )

    const categorizedRevenue = transactions.reduce(
      (acc, transaction) => {
        transaction.items.forEach(item => {
          acc[item.category] = (acc[item.category] || 0) + item.price * item.quantity
        })
        return acc
      },
      {} as Record<string, number>,
    )

    const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
    const averageTransactionValue = totalRevenue / transactions.length || 0

    return {
      dailyRevenue,
      categorizedRevenue,
      totalRevenue,
      averageTransactionValue
    }
  }, [transactions])

  const dailyRevenueChart = {
    labels: Object.keys(analyticsData.dailyRevenue),
    datasets: [
      {
        label: "Daily Revenue",
        data: Object.values(analyticsData.dailyRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const categorizedRevenueChart = {
    labels: Object.keys(analyticsData.categorizedRevenue),
    datasets: [
      {
        data: Object.values(analyticsData.categorizedRevenue),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Daily Revenue" },
    },
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <h2 className="text-3xl font-bold">Business Analytics</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { 
                  title: "Total Transactions", 
                  value: transactions.length,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )
                },
                { 
                  title: "Total Revenue", 
                  value: `$${analyticsData.totalRevenue.toFixed(2)}`,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  title: "Avg Transaction", 
                  value: `$${analyticsData.averageTransactionValue.toFixed(2)}`,
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )
                }
              ].map(({ title, value, icon }) => (
                <div 
                  key={title} 
                  className="
                    bg-white border border-gray-200 
                    rounded-2xl p-6 
                    flex items-center 
                    space-x-4 
                    shadow-md 
                    hover:shadow-xl 
                    transition-all
                  "
                >
                  {icon}
                  <div>
                    <h3 className="text-gray-500 text-sm">{title}</h3>
                    <p className="text-2xl font-bold">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Daily Revenue</h3>
                <Bar data={dailyRevenueChart} options={chartOptions} />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Revenue by Category</h3>
                <Doughnut 
                  data={categorizedRevenueChart} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" as const },
                    },
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}