import React from "react";
import { Box } from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-2";
import {
  convertWorkToHours,
  dayTimestamp,
  sum,
  weekTimestamp,
} from "../../helpers/helper";
import {
  msTimestamp,
  MILLISECONDS_IN_HOUR,
  inputFormattedTimestamp,
} from "../../helpers/date";
import PropTypes from "prop-types";

// BARCHART
const BarChart = ({ workPeriods }) => {
  const [chartData, setChartData] = React.useState({});

  // Split projects into hours per day for chart
  const data = () => {
    if (!workPeriods) return [];
    const projects = Array.from(new Set(workPeriods.map((wp) => wp.project)));
    const timeDemarcations = [
      dayTimestamp(),
      dayTimestamp(2),
      dayTimestamp(3),
      dayTimestamp(4),
      dayTimestamp(5),
      dayTimestamp(6),
      dayTimestamp(7),
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
          const endPoint = msTimestamp(wp.end_time);
          console.log(wp.title, endPoint, inputFormattedTimestamp(endPoint));
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
    console.log(mappedData);
    return mappedData;
  };

  data();

  // CHART
  const Chart = () => {
    setChartData({
      labels: [
        "Last 24 hours",
        "Last 48 hours",
        "3 days ago",
        "4 days ago",
        "5 days ago",
        "6 days ago",
        "1 week ago",
      ],
      datasets: data(),
    });
  };

  React.useEffect(() => {
    Chart();
  }, [workPeriods]);

  return (
    <Box>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          title: { text: "Where?", display: true },
          scales: {},
        }}
      />
    </Box>
  );
};

BarChart.propTypes = {
  workPeriods: PropTypes.object,
  period: PropTypes.string,
};

// PIE CHART
const PieChart = ({ workPeriods, period }) => {
  const [chartData, setChartData] = React.useState({});

  const data = () => {
    if (!workPeriods) return [];
    const startPoint = period === "week" ? weekTimestamp() : weekTimestamp(5);

    const relevantWorkperiods = workPeriods.filter(
      (wp) => msTimestamp(wp.end_time) > startPoint
    );

    const projectCounts = {};

    relevantWorkperiods.forEach((wp) => {
      const { project, end_time, start_time } = wp;
      projectCounts[project]
        ? (projectCounts[project] +=
            (msTimestamp(end_time) - msTimestamp(start_time)) /
            MILLISECONDS_IN_HOUR)
        : (projectCounts[project] =
            (msTimestamp(end_time) - msTimestamp(start_time)) /
            MILLISECONDS_IN_HOUR);
    });

    const labels = [];
    const backgroundColors = [];
    const datapoints = [];

    for (let [key, value] of Object.entries(projectCounts)) {
      labels.push(key);
      datapoints.push(Number(value.toFixed(2)));
      backgroundColors.push(
        workPeriods.find((wp) => wp.project === key).project_color
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
          title: { text: "Most Popular Projects", display: true },
          scales: {},
        }}
      />
    </Box>
  );
};

PieChart.propTypes = {
  workPeriods: PropTypes.object,
  period: PropTypes.string,
};

export { BarChart, PieChart };
