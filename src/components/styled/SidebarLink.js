import styled from "@emotion/styled";

const SidebarLink = styled.button`
  background: ${(props) => (props.primary ? props.primary : "#8eaedd")};
  padding: 4px;
  border-radius: 7px;
  opacity: 0.8;
  text-align: left;
  outline: none;
  border: none;

  &:hover {
    background: ${(props) => (props.primary ? props.primary : "#B6CBE8")};
  }
`;

export default SidebarLink;
