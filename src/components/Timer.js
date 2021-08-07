import React from "react";
import { Flex, Text, Input, Select, Box } from "@chakra-ui/react";
import NewButton from "./styled/NewButton";
import applicationColors from "../style/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { getProjects, createWorkPeriod } from "../data/api";
import { msToTimer } from "../helpers/date";
import PropTypes from "prop-types";

const Timer = ({ updateCurrentView, setShowTimer, setFlash }) => {
  const [projects, setProjects] = React.useState([]);
  const [projectId, setProjectId] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [timerDisplayed, setTimerDisplayed] = React.useState(false);
  const [timer, setTimer] = React.useState(null);

  React.useEffect(() => {
    getProjects().then((data) => {
      if (data.projects) {
        setProjects(data.projects);
        setProjectId(data.projects[0]?.id);
      }
    });
  }, []);

  const reset = () => {
    setPlaying(false);
    setTitle("");
    setStartTime(null);
    setProjectId(projects[0]?.id);
  };

  React.useEffect(() => {
    let interval;
    if (playing) {
      // Start timer
      setTimerDisplayed(true);
      const timer = Date.now() - startTime;
      setTimer(msToTimer(timer));
      // Update every second
      interval = window.setInterval(() => {
        const timer = Date.now() - startTime;
        setTimer(msToTimer(timer));
      }, 1000);
    }
    if (!playing) {
      setTimer(null);
      setTimerDisplayed(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <>
      {timerDisplayed && (
        <Box alignSelf="center">
          <Text color="gray.700" fontSize="3xl">
            {timer}
          </Text>
        </Box>
      )}
      <Flex
        alignSelf="center"
        align="center"
        w="100%"
        maxWidth="1000px"
        mb="30px"
        mt="30px"
      >
        {/* Play button */}
        <Flex
          data-cy="play"
          align="center"
          justify="center"
          p="25px"
          borderRadius="50%"
          cursor="pointer"
          marginRight="20px"
          style={{
            background: playing
              ? applicationColors.ERROR_COLOR
              : applicationColors.GREEN,
          }}
          onClick={() => {
            if (!playing) setStartTime(Date.now());
            if (playing) {
              createWorkPeriod({
                title,
                project_id: projectId,
                start_time: startTime,
                end_time: Date.now(),
              }).then((data) => {
                if (data.work_periods) {
                  updateCurrentView(data.work_periods);
                }
                setShowTimer(false);
                setFlash("Work successfully logged!");
              });
            }
            setPlaying(!playing);
          }}
        >
          <FontAwesomeIcon
            icon={playing ? faStop : faPlay}
            size="4x"
            color="white"
            style={{ position: "relative" }}
          />
        </Flex>
        <Input
          data-cy="title"
          placeholder="What are you working on?"
          p="25px"
          border="none"
          borderBottom="2px solid lightgray"
          borderRadius="none"
          outline="none"
          mr="20px"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          flex="2"
        />
        <Select
          flex="1"
          onChange={(e) => setProjectId(e.target.value)}
          data-cy="project"
        >
          {projects?.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </Select>
        <Flex direction="column" ml="20px" flex=".75">
          <NewButton style={{ textAlign: "center" }} onClick={reset}>
            Reset
          </NewButton>
        </Flex>
      </Flex>
    </>
  );
};

Timer.propTypes = {
  updateCurrentView: PropTypes.func,
  setShowTimer: PropTypes.func,
  setFlash: PropTypes.func,
};

export default Timer;
