import type { Transaction } from "../page"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Analytics({ transactions }: { transactions: Transaction[] }) {
  const dailyRevenue = transactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString()
      acc[date] = (acc[date] || 0) + transaction.totalAmount
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = {
    labels: Object.keys(dailyRevenue),
    datasets: [
      {
        label: "Daily Revenue",
        data: Object.values(dailyRevenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Daily Revenue",
      },
    },
  }

  const totalRevenue = transactions.reduce((sum, transaction) => sum + transaction.totalAmount, 0)
  const averageTransactionValue = totalRevenue / transactions.length || 0

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Transactions</h3>
          <p className="text-3xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Average Transaction Value</h3>
          <p className="text-3xl font-bold">${averageTransactionValue.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}

