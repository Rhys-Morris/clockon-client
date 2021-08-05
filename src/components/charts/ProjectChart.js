import React from "react";
import { Box } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import {
  convertWorkToHours,
  sum,
  weekTimestamp,
  workPeriodsBetweenTimestamps,
} from "../../helpers/helper";
import PropTypes from "prop-types";

const ProjectChart = ({ workPeriods }) => {
  const [chartData, setChartData] = React.useState({});

  // Calculate last 4 weeks hours
  const data = () => {
    if (!workPeriods) return [];
    const weekOne = workPeriodsBetweenTimestamps(
      workPeriods,
      weekTimestamp(),
      Date.now()
    );
    const weekTwo = workPeriodsBetweenTimestamps(
      workPeriods,
      weekTimestamp(2),
      weekTimestamp(1)
    );
    const weekThree = workPeriodsBetweenTimestamps(
      workPeriods,
      weekTimestamp(3),
      weekTimestamp(2)
    );
    const WeekFour = workPeriodsBetweenTimestamps(
      workPeriods,
      weekTimestamp(4),
      weekTimestamp(3)
    );
    return [weekOne, weekTwo, weekThree, WeekFour].map((week) =>
      sum(convertWorkToHours(week))
    );
  };

  console.log(data());

  // CHART
  const Chart = () => {
    setChartData({
      labels: ["Last Week", "2 Weeks Ago", "3 Weeks Ago", "4 Weeks Ago"],
      datasets: [
        {
          label: "Hours Worked",
          data: data(),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  React.useEffect(() => {
    Chart();
  }, [workPeriods]);

  return (
    <Box>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: { text: "THICCNESS SCALE", display: true },
          scales: {},
        }}
      />
    </Box>
  );
};

ProjectChart.propTypes = {
  workPeriods: PropTypes.object,
};

export default ProjectChart;
