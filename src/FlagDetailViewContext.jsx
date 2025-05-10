import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createRule, deleteRule, fetchFlag, updateRule } from "./services/flagService";
import axios from "axios";

export const DetailViewContext = createContext();

export const FlagDetailViewContext = ({children}) => {
    const [flag, setFlag] = useState();
    const [selectedRule, setSelectedRule] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {flagID} = useParams();

    const getFlag = async () => {
        setIsLoading(true);
        const fetchedFlag = await fetchFlag(flagID);
        
        if (!fetchedFlag) {
            // show error message to user if no flag was returned
            // e.g. setIsShowingMessage(true)
            // ...
        }

        setFlag(fetchedFlag);
        setIsLoading(false);
    }

    const addRule = async (rule) => {
        console.log("adding rule....");
        setIsLoading(true);
        const ruleConfig = {
            ...rule,
            linkedFlag: flag.key,
            status: "paused",
            audience_conditions: "",
            audience_ids: []
        }
        const createdRule = await createRule(ruleConfig);
        
        if (!createdRule) {
            // show error message to user if no rule was created + returned
            // e.g. setIsShowingMessage(true)
            // ...
        }

        setIsLoading(false);

        // fetch latest flag data with new rule
        getFlag();
    }

    const onRuleUpdate = async (rule) => {
        setIsLoading(true);
        const updatedRule = await updateRule(rule);
        
        if (!updatedRule) {
             // show error message to user if the rule was not updated
            // e.g. setIsShowingMessage(true)
            // ...
        }

        setIsLoading(false);
        
        // fetch latest flag data with new rule
        getFlag();
    }

    const onDeleteRule = async (ruleID) => {
         setIsLoading(true);
        const deletedRule = await deleteRule(flag.id, ruleID);
       
        if (!deletedRule) {
            // show error message to user if the rule was not deleted
            // e.g. setIsShowingMessage(true)
            // ...
        }

        setIsLoading(false);

        // fetch latest flag data with new rule
        getFlag();
    }

    useEffect(() => {
        getFlag();
    }, []);

    return (
        <DetailViewContext.Provider value={{flag, setFlag, selectedRule, onRuleSelect: setSelectedRule, isLoading, addRule, onRuleUpdate, onDeleteRule}}>
            {children}
        </DetailViewContext.Provider>
    )
}