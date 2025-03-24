import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

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

export const FlagDetailView = () => {
    const {flagID} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setFlag] = useState(null);
    const [selectedRule, setSelectedRule] = useState(null);

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
        
    }, [flagID]);

    return (
        <div style={{height: '100%'}}>
            <Link to="/flags">Back</Link>
            {isLoading && <div>Loading...</div>}

            
            {(!isLoading && flag) && 
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{width: '50%', padding: '32px'}}>
                        <h1>{flag.name}</h1>
                        <h5>{flag.key}</h5>

                        
                        <div>
                            <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid gray', paddingBottom: '16px'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{textAlign: 'left', marginRight: '15px'}}>
                                        <div>Environment</div>
                                        <div>Production</div>
                                    </div>
                                    <div style={{textAlign: 'left'}}>
                                        <div>Status</div>
                                        <div>Draft</div>
                                    </div>
                                </div>

                                <div>
                                    <button>Run</button>
                                </div>
                            </div>

                            {!!flag.rules.length ?
                            <>
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0'}}>
                                    The following rules will be evaluated for all visitors
                                    <button>Add Rule</button>
                                </div>
                                <div>
                                    {flag.rules.map((rule, idx) => {
                                        return <div style={{display: 'flex', width: '100%', margin: '8px 0px', alignItems: 'center'}} onClick={() => setSelectedRule(rule)}>
                                            <div style={{margin: '0 8px 0 16px'}}>{idx + 1}</div>
                                            <div style={{border: '0.5px solid gray',
                                    borderRadius: '2px',
                                    padding: '15px 15px 15px 45px',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    textAlign: 'left'}}>
                                                <div>
                                                    <p style={{margin: '0'}}>{rule.key}</p>
                                                    <p style={{margin: '0'}}>
                                                        <span>{rule.status}</span>
                                                        <span>{rule.type}</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <a href="#" onClick={() => setIsShowingTooltip(!isShowingTooltip)} className="text-dark" style={{fontSize: '1.5rem'}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg></a>
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </> :
                            <>
                                <div style={{display: 'flex', width: '100%', margin: '8px 0px', paddingTop: '16px'}} onClick={() => setSelectedRule(rule)}>
                                            <div style={{margin: '0 8px 0 16px'}}>1</div>
                                            <div style={{border: '0.5px solid gray',
                                    borderRadius: '2px',
                                    padding: '15px',
                                    width: '100%'}}>
                                        Add rules to customize delivery or run an experiment
                                            <button>Add rule</button>
                                            </div>
                                        </div>
                            </>
                            }
                        </div>
                    </div>
                    <div style={{width: '50%',  padding: '32px', background: 'rgb(250, 250, 250)',
    boxShadow: 'rgb(224, 224, 224) -1px 0px'}}>
                        {(!!flag.rules.length && !selectedRule) && <div>Select a rule to edit</div>}
                        {!flag.rules.length && <div>Add a rule to customize delivery or run an experiment</div>}
                        {selectedRule && <div>{selectedRule.key}</div>}
                    </div>
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