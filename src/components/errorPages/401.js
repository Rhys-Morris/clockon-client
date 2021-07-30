import React from "react";
import { Heading } from "@chakra-ui/react";
import applicationColors from "../../style/colors";

const Unauthorised = () => {
  return (
    <Heading
      color={applicationColors.ERROR_COLOR}
      textAlign="center"
      mt="100px"
    >
      401 Unauthorised
    </Heading>
  );
};

export default Unauthorised;
