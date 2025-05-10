import axios from "axios";

export const fetchFlag = async (flagID) => {
    console.log("fetching flag...");

    try {
        const res = await axios.get(`http://localhost:8080/api/26487234/flags/${flagID}`);
        const foundFlag = res.data;

        if (!foundFlag) {
            // successful request with no data returned
            return null;
        }

        return foundFlag;
    } catch (error) {
        console.log("Error fetching flag:", error);
        // throw error
        return null; 
    }
};

export const fetchFlags = async () => {

}

export const createFlag = async () => {

}

export const toggleFlagStatus = async () => {

}

export const deleteFlag = async () => {

}

export const createRule = async (rule) => {
    console.log("creating rule....");

    try {
        const res = await axios.post(`http://localhost:8080/api/48923489/rules`, rule);
        const createdRule = res.data;

        if (!createdRule) {
            // successful request with no data returned
            return null;
        }

        return createdRule;
    } catch(error) {
        console.log("Error creating rule:", error);
        // throw error
        return null; 
    }

}

export const updateRule = async (rule) => {
    console.log("updating rule...");

    try {
        const res = await axios.patch(`http://localhost:8080/api/48923489/rules`, rule);
        const updatedRule = res.data;
        console.log("updatedRule", res);


        if (!updatedRule) {
            // successful request with no data returned
            return null;
        }
        
        return updatedRule;
    } catch(error) {
        console.log("Error updating rule:", error);
        // throw error
        return null; 
    }
}

export const deleteRule = async (flagID, ruleID) => {
    console.log("deleting rule...");

    try {
        const res = await axios.delete(`http://localhost:8080/api/48923489/flags/${flagID}/rules/${ruleID}`);
        const deletedRule = res.data;
        console.log("updatedRule", res);


        if (!deletedRule) {
            // successful request with no data returned
            return null;
        }
        
        return deletedRule;
    } catch(error) {
        console.log("Error deleting rule:", error);
        // throw error
        return null; 
    }
}