import React from "react";
import {
  Flex,
  Input,
  Select,
  FormControl,
  FormLabel,
  Text,
  Box,
} from "@chakra-ui/react";
import { getProjects, createWorkPeriod } from "../../data/api";
import applicationColors from "../../style/colors";
import { formatTimestamp } from "../../helpers/helper";
import { inputFormattedToday, msTimestamp } from "../../helpers/date";
import NewButton from "../styled/NewButton";
import PropTypes from "prop-types";

const WorkPeriodForm = ({ updateCurrentView, setShowForm, setFlash }) => {
  const [projects, setProjects] = React.useState([]);
  const [projectId, setProjectId] = React.useState(0);
  const [title, setTitle] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getProjects().then((data) => {
      if (data.projects) {
        setProjects(data.projects);
        setProjectId(data.projects[0]?.id);
      }
    });
  }, []);

  // Check validity of input
  const checkTimeValidity = () => {
    if (!startDate || !startTime || !endDate || !endTime) {
      setError("All time related fields must be filled out");
      return false;
    }
    if (
      msTimestamp(formatTimestamp(endDate, endTime)) <=
      msTimestamp(formatTimestamp(startDate, startTime))
    ) {
      setError("End of work period must be later than start");
      return false;
    }
    if (title.length > 100) {
      setError("Title must be less than 100 characters");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!checkTimeValidity()) {
      setTimeout(() => setError(null), 8000);
      return;
    }
    createWorkPeriod({
      title,
      project_id: projectId,
      start_time: msTimestamp(formatTimestamp(startDate, startTime)),
      end_time: msTimestamp(formatTimestamp(endDate, endTime)),
    }).then((data) => {
      if (data.work_periods) {
        updateCurrentView(data.work_periods);
        setFlash("Work successfully logged!");
      }
      setShowForm(false);
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setTitle("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
  };
  return (
    <Box w="100%" maxWidth="1200px">
      <form onSubmit={onSubmit}>
        <Flex align="center" justify="center" width="100%" p="50px">
          <Flex direction="column" flex="3.2" mr="30px">
            <Input
              data-cy="title"
              placeholder="What did you work on?"
              p="25px"
              border="none"
              borderBottom="2px solid lightgray"
              borderRadius="none"
              outline="none"
              mr="10px"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Flex mt="30px" align="center">
              <Text mr="10px">for</Text>
              <Select
                w="50%"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                data-cy="project"
              >
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
          <Flex direction="column" m="0 10px" width="200px">
            <FormControl>
              <FormLabel size="xs" color="gray.500" m="0">
                Start Date:
              </FormLabel>
              <Input
                data-cy="startDate"
                type="date"
                value={startDate}
                max={inputFormattedToday()}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setEndDate(
                    e.target.value > endDate ? e.target.value : endDate
                  );
                }}
              />
              <FormControl mt="10px">
                <FormLabel size="xs" color="gray.500" m="0">
                  Start Time:
                </FormLabel>
                <Input
                  data-cy="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>
            </FormControl>
          </Flex>
          <Flex direction="column" m="0 10px" width="200px">
            <FormControl>
              <FormLabel size="xs" color="gray.500" m="0">
                End Date:
              </FormLabel>
              <Input
                data-cy="endDate"
                min={startDate}
                type="date"
                value={endDate}
                max={inputFormattedToday()}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <FormControl mt="10px">
                <FormLabel size="xs" color="gray.500" m="0">
                  End Time:
                </FormLabel>
                <Input
                  data-cy="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </FormControl>
            </FormControl>
          </Flex>
          <Flex direction="column" ml="20px" flex=".75">
            <NewButton
              data-cy="submit"
              type="submit"
              style={{ marginBottom: "15px", textAlign: "center" }}
            >
              Submit
            </NewButton>
            <NewButton style={{ textAlign: "center" }} onClick={reset}>
              Reset
            </NewButton>
          </Flex>
        </Flex>
      </form>
      {error && (
        <Text
          data-cy="error"
          color={applicationColors.ERROR_COLOR}
          textAlign="center"
          m="20px 0"
          fontSize="lg"
        >
          {error}
        </Text>
      )}
    </Box>
  );
};

WorkPeriodForm.propTypes = {
  updateCurrentView: PropTypes.func,
  setShowForm: PropTypes.func,
  setFlash: PropTypes.func,
};

export default WorkPeriodForm;
