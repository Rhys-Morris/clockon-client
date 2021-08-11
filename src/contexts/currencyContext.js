import React from "react";

const CurrencyContext = React.createContext();

export const CurrencyConsumer = CurrencyContext.Consumer;
export const CurrencyProvider = CurrencyContext.Provider;
export default CurrencyContext;
