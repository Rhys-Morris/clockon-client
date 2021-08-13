import applicationColors from "./colors";

// ----- HERO -----

const letterRotate = {
  transform: "rotate(15deg)",
  color: "#8eaedd",
  display: "inline-block",
  margin: "0 1px",
  fontWeight: "bold",
};

const videoBackground = {
  objectFit: "cover",
  width: "100%",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "-99",
};

// ----- PROJECTS -----

const iconMarginRight = {
  marginRight: "5px",
};

const inputStyle = {
  width: "175px",
};

const activeSelectStyle = {
  border: "2px solid gray",
};

// ---- CLIENTS -----

const cardStyle = {
  border: "2px solid lightgrey",
  borderRadius: "5px",
  color: "black",
  width: "300px",
  height: "170px",
  position: "relative",
  boxShadow: "2px 2px 8px 2px rgba(0,0,0,.2)",
};

const ellipsisStyle = {
  position: "absolute",
  right: "10px",
  top: "5px",
  padding: "2px",
  cursor: "pointer",
};

const workButtonStyle = {
  flexDirection: "column",
  background: applicationColors.DARK_LIGHT_BLUE,
  borderRadius: "10px",
  height: "250px",
  width: "250px",
  padding: "10px",
  alignItems: "center",
  justifyContent: "space-around",
  margin: "0 20px",
  boxShadow: "3px 3px 3px 3px rgba(0, 0, 0, 0.15)",
  transition: ".3s",
  cursor: "pointer",
};

export {
  letterRotate,
  videoBackground,
  iconMarginRight,
  inputStyle,
  activeSelectStyle,
  cardStyle,
  ellipsisStyle,
  workButtonStyle,
};
