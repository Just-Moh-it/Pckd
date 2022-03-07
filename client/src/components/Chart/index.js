import React, {useEffect} from "react";
// Import Highcharts
import Highcharts from "highcharts/highstock";
//import HighchartsReact from "./HighchartsReact.js";
import PieChart from "highcharts-react-official";

const Chart = ({ title, subtitle, data, options: propOptions }) => {
  useEffect(() => {
    // Remove element
    document.getElementsByClassName('highcharts-credits')[0].remove();
  }, [])

  const options = {
    title: { text: title },
    subtitle: { text: subtitle || "" },
    chart: {
      type: "pie",
      innerHeight: "100px",
      backgroundColor: "#f3f8fe",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        innerSize: "50%",
        // minPointSize: 100,
        data,
        innerRadius: "10",
      },
    ],
    ...propOptions,
  };

  return <PieChart highcharts={Highcharts} options={options} />;
};

export default Chart;
