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

export const updateRule = async (updatedRule) => {
    // console.log("update rule");

    // axios.patch(`http://localhost:8080/api/48923489/rules`, updatedRule)
    // .then(res => {
    //     console.log("patch res = ", res)
        
    //     if (res.data.status === "success") {
    //         fetchFlag();
    //     } else {
    //     //   showError(result.message || "Failed to update rule");
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}

export const deleteRule = async (ruleId) => {
    
    // axios.delete(`http://localhost:8080/api/48923489/flags/${flag.id}/rules/${ruleId}`)
    // .then(res => {
    //     fetchFlag();
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}