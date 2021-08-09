import styled from "@emotion/styled";
import applicationColors from "../../style/colors";

const HamburgerLine = styled.div`
  width: 80%;
  background: ${applicationColors.SOFT_LIGHT_BLUE};
  border-radius: 3px;
  height: 3px;
  margin: 4px 0;
`;

const HamburgerBox = styled.div`
  display: flex;
  background: ${applicationColors.NAVY};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 3px;
`;

export { HamburgerBox, HamburgerLine };
