import styled from "@emotion/styled";
import applicationColors from "../../style/colors";

const HamburgerLine = styled.div`
  width: 65%;
  background: white;
  border-radius: 5px;
  height: 2px;
  margin: 3px 0;
`;

const HamburgerBox = styled.div`
  display: flex;
  background: ${applicationColors.DARK_LIGHT_BLUE};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export { HamburgerBox, HamburgerLine };
