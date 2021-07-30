import styled from "@emotion/styled";
import applicationColors from "../../style/colors";

const PillButton = styled.button`
  background: ${(props) =>
    props.bg ? props.bg : applicationColors.DARK_LIGHT_BLUE};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  padding: 10px 50px;
  border-radius: 25px;
  text-align: center;
  outline: none;
  border: none;
  color: white;
  transition: 0.3s;

  &:hover {
    background: ${(props) =>
      props.bgHover ? props.bgHover : applicationColors.LIGHT_BLUE};
    color: ${(props) => (props.bgColor ? props.bgColor : "white")};
  }
`;

export default PillButton;
