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
import axios from "../../../utils/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function ItemTypeChart({ category, title = "", label = "" }) {
  const [dataOption, setDataOption] = useState({
    labels: [],
    datasets: [],
  });
  const colors = ["#7e22ce", "#0174BE", "#FFA33C"];
  const opacity = 60;

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
    axios.get(`/orders/${category}/item/all`).then(({ data }) => {
      setDataOption({
        labels: data.cake.map((item) => item.label),
        datasets: Object.entries(data).map(([key, value], idx) => ({
          label: key,
          data: value.map((item) => item.count),
          backgroundColor: colors[idx] + opacity,
          borderColor: colors[idx],
          hoverBackgroundColor: colors[idx] + (opacity + 20),
          borderWidth: 1,
        })),
      });
    });
  }, []);
  return (
    <Paper className="p-4">
      <LineGraph options={options} data={dataOption} />
    </Paper>
  );
}

export default ItemTypeChart;
