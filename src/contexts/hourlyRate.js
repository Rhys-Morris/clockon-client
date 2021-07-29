import React from "react";

const WageContext = React.createContext();

export const WageConsumer = WageContext.Consumer;
export const WageProvider = WageContext.Provider;
export default WageContext;
