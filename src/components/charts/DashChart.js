import React from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { Bar, Pie, defaults } from "react-chartjs-2";
import {
  convertWorkToHours,
  dayTimestamp,
  sum,
  weekTimestamp,
} from "../../helpers/helper";
import { MILLISECONDS_IN_HOUR } from "../../helpers/date";
import PropTypes from "prop-types";

// ----- BARCHART -----
const BarChart = ({ workPeriods, period }) => {
  const [chartData, setChartData] = React.useState({});
  const [breakpoint1000] = useMediaQuery("(max-width: 1000px)");
  const [breakpoint900] = useMediaQuery("(max-width: 900px)");

  defaults.color = breakpoint1000 ? "white" : "grey.700";

  // Split projects into hours per day for chart
  const data = () => {
    if (!workPeriods || workPeriods.length === 0)
      return [
        {
          label: "No Work Periods to Display",
          data: [],
          backgroundColor: "grey",
        },
      ];
    const projects = Array.from(new Set(workPeriods.map((wp) => wp.project)));
    const timeDemarcations =
      period === "week"
        ? [
            dayTimestamp(),
            dayTimestamp(2),
            dayTimestamp(3),
            dayTimestamp(4),
            dayTimestamp(5),
            dayTimestamp(6),
            dayTimestamp(7),
          ]
        : [
            weekTimestamp(),
            weekTimestamp(2),
            weekTimestamp(3),
            weekTimestamp(4),
            weekTimestamp(5),
            weekTimestamp(6),
          ];

    // Map projects to relevant data
    const mappedData = projects.map((project) => {
      const projectData = { label: project, data: [] };
      // Iterate over each timepoint
      timeDemarcations.forEach((time, index) => {
        const matchingPeriods = workPeriods.filter((wp) => {
          // If not for this project return false
          if (wp.project !== project) return false;
          // Get end timestamp
          const endPoint = wp.end_time;
          if (endPoint < time) return false;
          if (index === 0 && endPoint >= time) return true;
          if (endPoint >= time && endPoint < timeDemarcations[index - 1])
            return true;
        });
        // No matching data - push 0 as datapoint and return
        if (matchingPeriods.length === 0) {
          projectData.data.push(0);
          return;
        }
        // Map the matching workPeriods to hours and sum them
        projectData.data.push(sum(convertWorkToHours(matchingPeriods)));
      });
      projectData.backgroundColor = workPeriods.find(
        (wp) => wp.project === project
      ).project_color;
      return projectData;
    });
    return mappedData;
  };

  data();

  // CHART
  const Chart = () => {
    setChartData({
      labels:
        period === "week"
          ? [
              "Last 24 hours",
              "Last 48 hours",
              "3 days ago",
              "4 days ago",
              "5 days ago",
              "6 days ago",
              "1 week ago",
            ]
          : [
              "This Week",
              "Last Week",
              "3 weeks ago",
              "4 weeks ago",
              "5 weeks ago",
              "6 weeks ago",
            ],
      datasets: data(),
    });
  };

  React.useEffect(() => {
    Chart();
  }, [workPeriods]);

  return (
    <Box width={breakpoint900 ? "95vw" : "760px"}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </Box>
  );
};

BarChart.propTypes = {
  workPeriods: PropTypes.array,
  period: PropTypes.string,
};

// ----- PIE CHART -----
const PieChart = ({ workPeriods }) => {
  const [chartData, setChartData] = React.useState({});
  const [breakpoint600] = useMediaQuery("(max-width: 600px)");

  const data = () => {
    if (!workPeriods) return [];
    const projectCounts = {};

    workPeriods.forEach((wp) => {
      const { project, end_time, start_time } = wp;
      projectCounts[project]
        ? (projectCounts[project] +=
            (end_time - start_time) / MILLISECONDS_IN_HOUR)
        : (projectCounts[project] =
            (end_time - start_time) / MILLISECONDS_IN_HOUR);
    });

    const labels = [];
    const backgroundColors = [];
    const datapoints = [];

    for (let [key, value] of Object.entries(projectCounts)) {
      labels.push(key);
      datapoints.push(Number(value.toFixed(2)));
      backgroundColors.push(
        workPeriods.find((wp) => wp.project === key)?.project_color
      );
    }
    return [labels, backgroundColors, datapoints];
  };

  const [labels, backgroundColor, datapoints] = data();

  // CHART
  const Chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Project Hours",
          data: datapoints,
          backgroundColor: backgroundColor,
          borderColor: "white",
        },
      ],
    });
  };

  React.useEffect(() => {
    Chart();
  }, [workPeriods]);

  return (
    <Box mb="20px" width={breakpoint600 ? "220px" : "250px"} mr="20px">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Most Popular Projects", display: true },
          scales: {},
        }}
      />
    </Box>
  );
};

PieChart.propTypes = {
  workPeriods: PropTypes.array,
  period: PropTypes.string,
};

export { BarChart, PieChart };
