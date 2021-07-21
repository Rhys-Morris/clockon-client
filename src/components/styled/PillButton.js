import styled from "@emotion/styled";

const PillButton = styled.button`
  background: ${(props) => (props.primary ? props.primary : "#8eaedd")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "inherit")};
  padding: 10px 50px;
  border-radius: 25px;
  text-align: center;
  outline: none;
  border: none;
  color: white;

  &:hover {
    background: ${(props) => (props.primary ? props.primary : "#a5bee4")};
  }
`;

export default PillButton;
