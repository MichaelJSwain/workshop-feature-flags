import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

const dummyData = [{
    name: 'exp 1',
    key: 'exp_1'
},
{
    name: 'exp 2',
    key: 'exp_2'
}]

export const FlagDetailView = () => {
    const {flagID} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setFlag] = useState(null);

    useEffect(() => {
        setIsLoading(true);

        // fetch data for flag
        setTimeout(() => {
            const foundFlag = dummyData.find(item => item.key == flagID);

            if (foundFlag) {
                setFlag(foundFlag);   
            }

            setIsLoading(false);
        }, 3000);
        
    }, [flagID]);

    return (
        <div>Flag Detail View Page
            <Link to="/flags">Back</Link>
            {isLoading && <div>Loading...</div>}

            {(!isLoading && flag) && 
                <div>
                    <h1>{flag.name}</h1>
                    <h5>{flag.key}</h5>
                </div>
            }

            {(!isLoading && !flag) && 
                <div>
                    <div>Error!</div>
                </div>
            }
        </div>
    )
}