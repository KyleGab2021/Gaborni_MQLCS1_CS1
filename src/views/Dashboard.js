import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";


const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3001/prod");
      setProducts(result.data);
    };
    fetchData();
  }, []);

  const productNames = products.map((item) => item.productname);
  const sales = products.map((item) => parseFloat(item.sales));
  const quantities = products.map((item) => parseInt(item.quantity));
  const prices = products.map((item) => parseFloat(item.price));

  const lineChartData = {
    labels: productNames,
    datasets: [
      {
        label: "Top Product Sales",
        borderColor: "#FFFFFF",
        pointBorderColor: "#FFFFFF",
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: "#FFFFFF",
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(0, 0, 0, 0.2)", // Black background color for line chart
        borderWidth: 2,
        tension: 0.4,
        data: sales,
      },
    ],
  };

  const barChartQuantitiesData = {
    labels: productNames,
    datasets: [
      {
        label: "Quantity",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: quantities,
      },
    ],
  };

  const barChartPricesData = {
    labels: productNames,
    datasets: [
      {
        label: "Price",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        data: prices,
      },
    ],
  };

  return (
    <div>
      <div className="content" style={{ background: "#252525", paddingTop: "50px", height: "105vh" }}> {/* Gray background color and padding top */}
        <div className="container-fluid">
          <h2 style={{ color: "#FFF" }}>PRODUCTS</h2> {/* Changed text color */}
          <Line
            data={lineChartData}
            options={{
              title: {
                display: true,
                text: "Sales by Product",
                fontSize: 20,
                color: "#FFF", // Added text color
              },
              legend: {
                display: true,
                position: "right",
                labels: {
                  color: "#FFF", // Added text color
                },
              },
              scales: {
                y: {
                  ticks: {
                    fontColor: "rgba(255,255,255,0.4)",
                    fontStyle: "bold",
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    padding: 10,
                  },
                  grid: {
                    drawTicks: true,
                    drawBorder: false,
                    display: true,
                    color: "rgba(255,255,255,0.1)",
                    zeroLineColor: "transparent",
                  },
                },
                x: {
                  display: false, // Removed x-axis labels
                },
              },
              layout: {
                padding: { left: 20, right: 20, top: 10, bottom: 0 },
              },
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "50%" }}>
              <h2 style={{ color: "#000000" }}>‎ </h2> {/* Changed text color */}
              <Bar
                data={barChartQuantitiesData}
                options={{
                  title: {
                    display: true,
                    text: "Quantity by Product",
                    fontSize: 16,
                    color: "#FFF", // Added text color
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "#FFF", // Added text color
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 10,
                      },
                      grid: {
                        drawTicks: true,
                        drawBorder: false,
                        display: true,
                        color: "rgba(255,255,255,0.1)",
                        zeroLineColor: "transparent",
                      },
                    },
                    x: {
                      display: false, // Removed x-axis labels
                    },
                  },
                }}
              />
            </div>
            <div style={{ width: "50%" }}>
              <h2 style={{ color: "#000000" }}>‎ </h2> {/* Changed text color */}
              <Bar
                data={barChartPricesData}
                options={{
                  title: {
                    display: true,
                    text: "Prices by Product",
                    fontSize: 16,
                    color: "#FFF", // Added text color
                  },
                  legend: {
                    display: true,
                    position: "right",
                    labels: {
                      color: "#FFF", // Added text color
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        fontColor: "rgba(255,255,255,0.4)",
                        fontStyle: "bold",
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        padding: 10,
                      },
                      grid: {
                        drawTicks: true,
                        drawBorder: false,
                        display: true,
                        color: "rgba(255,255,255,0.1)",
                        zeroLineColor: "transparent",
                      },
                    },
                    x: {
                      display: false, // Removed x-axis labels
                    },
                  },
                  layout: {
                    padding: { left: 20, right: 20, top: 10, bottom: 0 },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="content" style={{ background: "#FFFFFF", height: "50vh" }}> {/* White background color */}

      </div>
    </div>
  );
};

export default Dashboard;
