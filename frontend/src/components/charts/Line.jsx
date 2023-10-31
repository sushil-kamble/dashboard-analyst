import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineGraph } from "react-chartjs-2";
import { Paper } from "@mui/material";
import { ORDERS_API_URL } from "../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Line({ endPoint, title = "", label = "", color = "#7e22ce" }) {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);
  const opacity = 30;

  const dataOption = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: color + opacity,
        borderColor: color.split(opacity)[0],
        hoverBackgroundColor: color + (opacity + 20),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
        },
      },
      y: {
        title: {
          display: true,
          text: "X-Axis Label",
        },
      },
    },
  };
  useEffect(() => {
    fetch(`${ORDERS_API_URL}/${endPoint}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.map((item) => item.count));
        setLabels(data.map((item) => item.label));
      });
  }, []);
  return (
    <Paper className="p-4">
      <LineGraph options={options} data={dataOption} />
    </Paper>
  );
}

export default Line;
