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
    background: ${(props) => (props.primary ? props.primary : "#7eaedd")};
  }
`;

export default NewButton;
