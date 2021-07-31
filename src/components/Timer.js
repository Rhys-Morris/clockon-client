import React from "react";
import { Flex, Text, Input, Select } from "@chakra-ui/react";
import NewButton from "./styled/NewButton";
import applicationColors from "../style/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { getProjects, createWorkPeriod } from "../data/api";
import { inputFormattedTimestamp } from "../helpers/date";

const Timer = ({ updateCurrentView }) => {
  const [projects, setProjects] = React.useState([]);
  const [projectId, setProjectId] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [error, setError] = React.useState(null);

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

  return (
    <>
      <Flex align="center" w="100%" maxWidth="1000px" mb="30px">
        {/* Play button */}
        <Flex
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
                start_time: new Date(startTime),
                end_time: new Date(Date.now()),
              }).then((data) => {
                if (data.work_periods) {
                  updateCurrentView(data.work_periods);
                }
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
        <Select flex="1" onChange={(e) => setProjectId(e.target.value)}>
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
      {error && (
        <Text mb="30px" mt="30px" color={applicationColors.ERROR_COLOR}>
          {error}
        </Text>
      )}
    </>
  );
};

export default Timer;
