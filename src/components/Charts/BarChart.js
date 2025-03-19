import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data, width = "100%", height = 350, colors = ["#A68A28", "#000"], chartTitle="XYZ" }) => {
  const options = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    theme: {
      color: '#000',
      fontFamily: 'Montserrat, sans-serif', // Change this to your preferred font
    },
    title: {
      text: chartTitle,
      align: "center",
      style: { fontSize: "16px", fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#000000' },
    },
    xaxis: {
      categories: data.map((item) => item.x),
      style: {
        color: '#000000',
        fontFamily: 'Montserrat, sans-serif', // Specific font for tooltip
      },
    },
    colors,
    tooltip: {
      style: {
        color: '#000000',
        fontFamily: 'Montserrat, sans-serif', // Specific font for tooltip
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels (counts on top of bars)
    },
  };

  const seriesNames = Object.keys(data[0] || {}).filter(key => key !== "x");

  const series = seriesNames.map(name => ({
    name,
    data: data.map(item => item[name]),
  }));

  return <Chart options={options} series={series} type="bar" width={width} height={height} />;
};

export default BarChart;
