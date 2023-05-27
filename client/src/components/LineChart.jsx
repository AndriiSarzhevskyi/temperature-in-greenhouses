
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
export const LineChart = ({data}) => {

  return(
       <Line data = {data}></Line>
  )
}