import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const dummyData = [{
    name: 'exp 1',
    key: 'exp_1',
    rules: [{
        name: 'rule 1',
        key: 'rule_1',
        type: 'a/b',
        status: 'paused'
    },
    {
        name: 'rule 2',
        key: 'rule_2',
        type: 'a/b',
        status: 'paused'
    }]
},
{
    name: 'exp 2',
    key: 'exp_2',
    rules: []
}]

export const DetailViewContext = createContext();

export const FlagDetailViewContext = ({children}) => {
    const [flag, setFlag] = useState();
    const [selectedRule, setSelectedRule] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const {flagID} = useParams();

    useEffect(() => {
        setIsLoading(true);

        // fetch data for flag
        setTimeout(() => {
            const foundFlag = dummyData.find(item => item.key == flagID);

            if (foundFlag) {
                setFlag(foundFlag);   
            }

            setIsLoading(false);
        }, 200);
        
    }, []);

    return (
        <DetailViewContext.Provider value={{flag, setFlag, selectedRule, onRuleSelect: setSelectedRule, isLoading}}>
            {children}
        </DetailViewContext.Provider>
    )
}