import styled from "@emotion/styled";

const NewButton = styled.button`
  background: ${(props) => (props.primary ? props.primary : "#8eaedd")};
  padding: 10px 12px;
  border-radius: 7px;
  text-align: left;
  outline: none;
  border: none;
  color: white;
  font-weight: bold;

  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : "#B6CBE8")};
  }
`;

export default NewButton;
