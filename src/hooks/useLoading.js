import { useState } from "react";

export const useLoading = () => {
    const [isLoading, setIsLoading] = useState(false);

    const withLoading = async (asyncFunc) => {
        setIsLoading(true);
        console.log("inside with loading wrapper");
        try {
            const res = await asyncFunc();
            return res;
        } finally {
            setIsLoading(false);
        }
    }

    return {isLoading, withLoading};
}