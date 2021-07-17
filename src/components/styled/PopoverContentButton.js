import styled from "@emotion/styled";

const PopoverContentButton = styled.button`
  background: ${(props) => (props.color ? props.color : "#eee")};
  padding: 4px 8px;
  border-radius: 7px;
  opacity: 0.8;
  text-align: left;
  outline: none;
  margin: 2px 0;
  border: none;

  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : "#ddd")};
  }
`;

export default PopoverContentButton;
