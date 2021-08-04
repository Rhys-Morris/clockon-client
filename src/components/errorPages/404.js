import React from "react";
import { Heading } from "@chakra-ui/react";
import applicationColors from "../../style/colors";

const NoContent = () => {
  return (
    <Heading
      color={applicationColors.ERROR_COLOR}
      textAlign="center"
      mt="100px"
    >
      404 No Content
    </Heading>
  );
};

export default NoContent;
