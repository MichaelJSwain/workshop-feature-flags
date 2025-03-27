import { createContext, useState } from "react";

export const DetailViewContext = createContext();

export const FlagDetailViewContext = ({children}) => {
    const [selectedRule, setSelectedRule] = useState();
    return (
        <DetailViewContext.Provider value={{selectedRule, onRuleSelect: setSelectedRule}}>
            {children}
        </DetailViewContext.Provider>
    )
}