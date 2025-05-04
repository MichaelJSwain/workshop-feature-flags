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
            setFlag(fetchedFlag);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setFlag(null);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        fetchFlag();
    }, []);

    return (
        <DetailViewContext.Provider value={{flag, setFlag, selectedRule, onRuleSelect: setSelectedRule, isLoading}}>
            {children}
        </DetailViewContext.Provider>
    )
}