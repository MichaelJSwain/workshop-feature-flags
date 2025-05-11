import axios from "axios";

export const fetchFlag = async (flagID) => {
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
    try {
        const res = await axios.get('http://localhost:8080/api/26487234/flags');
        const fetchedFlags = res.data;

        if (!fetchedFlags) {
            return null;
        }

        return fetchedFlags;
    } catch(error) {
        console.log("Error fetching flags:", error);
        // throw error
        return null; 
    }
}

export const createFlag = async (name, key, description) => {
    try {
        const res = await axios.post(`http://localhost:8080/api/48923489/flags`, {name, key, description});
        const createdFlag = res.data;

        if (!createdFlag) {
            // successful request with no data returned
            return null;
        }

        return createdFlag;
    } catch (error) {
        console.log("Error creating flag:", error);
        // throw error
        return null; 
    }
}

export const toggleFlagStatus = async (flagID) => {
    try {
        const res = await axios.patch(`http://localhost:8080/api/48923489/flags/${flagID}`);
        const toggledFlag = res.data;

        if (!toggledFlag) {
            // successful request with no data returned
            return null;
        }
        
        return toggledFlag;
    } catch(error) {
        console.log("Error toggling flag status:", error);
        // throw error
        return null; 
    }
}

export const deleteFlag = async (flagID) => {
    try {
        const res = await axios.delete(`http://localhost:8080/api/48923489/flags/${flagID}`);
        const deletedFlag = res.data;

        if (!deletedFlag) {
            return null
        }

        return deletedFlag;
    } catch(error) {
          console.log("Error deleting flag:", error);
        // throw error
        return null; 
    }
}

export const createRule = async (rule) => {
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
    try {
        const res = await axios.patch(`http://localhost:8080/api/48923489/rules`, rule);
        const updatedRule = res.data;

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