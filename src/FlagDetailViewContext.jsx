import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const DetailViewContext = createContext();

export const FlagDetailViewContext = ({children}) => {
    const [flag, setFlag] = useState();
    const [selectedRule, setSelectedRule] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {flagID} = useParams();

    const fetchFlag = async () => {
        setIsLoading(true);
        axios.get(`http://localhost:8080/api/26487234/flags/${flagID}`)
        .then(res => {
            const fetchedFlag = res.data ? res.data : null;
            console.log("fetched flag = ", fetchedFlag);
            setFlag(fetchedFlag);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setFlag(null);
            setIsLoading(false);
        })
    }

    const addRule = async (rule) => {
        console.log("adding rule....");
        const ruleConfig = {
            ...rule,
            linkedFlag: flag.key,
            status: "paused",
            audience_conditions: "",
            audience_ids: []
        }

        axios.post(`http://localhost:8080/api/48923489/rules`, ruleConfig)
        .then(res => {
            console.log(res);
            if (res.data) {
                const newRule = res.data;
                const copyFlag = {...flag};
                copyFlag.rules.push(newRule.key);
                copyFlag.rulesConfigs.push(newRule);
                setFlag(copyFlag);
            }
            // else handle error...
        })
        .catch(error => {
            console.log(error);
        })
    }

    const updateRule = async (updatedRule) => {
        console.log("update rule");

        axios.patch(`http://localhost:8080/api/48923489/rules`, updatedRule)
        .then(res => {
            if (res.ok && result.status === "success") {
                const {updatedRule} = res.data.data;
                
                const updatedRules = flag.rulesConfigs.map(rule => {
                    return rule.id == updatedRule.id ? updatedRule : rule;
                })
                const copyFlag = {...flag, ruleConfigs: updatedRules};
                setFlag(copyFlag);
            //   showToast("Rule updated successfully!");
            } else {
            //   showError(result.message || "Failed to update rule");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    const deleteRule = async (ruleId) => {
        
        axios.delete(`http://localhost:8080/api/48923489/flags/${flag.id}/rules/${ruleId}`)
        .then(res => {
            
        })
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchFlag();
    }, []);

    return (
        <DetailViewContext.Provider value={{flag, setFlag, selectedRule, onRuleSelect: setSelectedRule, isLoading, addRule, updateRule, deleteRule}}>
            {children}
        </DetailViewContext.Provider>
    )
}