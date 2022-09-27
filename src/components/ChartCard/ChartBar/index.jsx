import React, { useEffect, useState } from 'react'
import { Button, Spin, Card } from 'antd'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import moment from 'moment'
export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel + ' Rb'
        },
      },
    },
  },
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
// const data = {
//   labels: [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ],
//   datasets: [
//     {
//       label: 'Sales/ month',
//       backgroundColor: 'rgba(30, 127, 240, 1)',
//       borderColor: 'rgba(163, 165, 169, 1)',
//       pointBorderColor: 'rgba(163, 165, 169, 1)',
//       pointBackgroundColor: '#fff',
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       data: [65, 59, 80, 81, 56, 55, 40, 57, 40, 48, 59, 62],
//     },
//   ],
// }
const ChartBar = ({ transactionData = [] }) => {
  const [loading, setLoading] = useState(true)
  const [dataChart, setDataChart] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    if (transactionData !== null) {
      const label = getLabel(transactionData)
      const datas = getData(label, transactionData)

      setDataChart({
        labels: label,
        datasets: [
          {
            label: 'Sales/month',
            backgroundColor: 'rgba(30, 127, 240, 1)',
            borderColor: 'rgba(163, 165, 169, 1)',
            pointBorderColor: 'rgba(163, 165, 169, 1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: datas,
          },
        ],
      })
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    console.log(dataChart)
  }, [dataChart])

  const getLabel = (dataTransaksi) => {
    const getTahun = dataTransaksi.map((transaction) =>
      moment(transaction.createdAt).format('MMMM')
    )
    const uniq = [...new Set(getTahun)]
    return uniq
  }

  const getData = (label, dataTransaksi) => {
    let result = label.map((labelItem) => 0)
    dataTransaksi.map((transaction) => {
      const indexMonthLabel = label.indexOf(
        moment(transaction.createdAt).format('MMMM')
      )
      result[indexMonthLabel] =
        result[indexMonthLabel] + transaction.totalPayment
    })
    return result
  }

  return (
    <Card className="chart-card__graph">
      <div className="chart-card__graph__header">
        <h2>Ringkasan Penjualan</h2>
        <Button>Per tahun</Button>
      </div>
      {loading ? (
        <Spin>
          <div className="chart-card__graph__loading"></div>
        </Spin>
      ) : (
        <Bar options={options} data={dataChart} height={130} />
      )}
    </Card>
  )
}

export default ChartBar
