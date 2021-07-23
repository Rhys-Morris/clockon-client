import styled from "@emotion/styled";

const PopoverContentButton = styled.button`
  background: ${(props) => (props.color ? props.color : "#eee")};
  padding: 2px 4px;
  border-radius: 7px;
  opacity: 0.7;
  color: white;
  text-align: left;
  outline: none;
  margin: 1px 0;
  font-size: 14px;
  border: none;

  &:hover {
    background: ${(props) => (props.hoverColor ? props.hoverColor : "#ddd")};
  }
`;

export default PopoverContentButton;
