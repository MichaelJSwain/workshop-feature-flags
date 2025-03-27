import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { LayoutArea } from "../../components/LayoutArea/LayoutArea";
import { LayoutGrid } from "../../components/LayoutGrid/LayoutGrid";
import { Button } from "../../components/Button/Button";
import { DropdownGroup } from "../../components/DropdownGroup/DropdownGroup";
import { RuleList } from "../../components/RuleList/RuleList";
import { DetailViewContext } from "../../FlagDetailViewContext.jsx"

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
    const {flag, selectedRule, isLoading, onRuleSelect} = useContext(DetailViewContext)

    return (
        // <FlagDetailViewContext>
            <div style={{height: '100%'}}>
                <Link to="/flags">Back</Link>
                {isLoading && <div>Loading...</div>}

                
                {(!isLoading && flag) && 
                    
                    <LayoutGrid areas={`'main config' 'form-controls form-controls'`} columns="1fr 1fr" gap="0px" rows="1fr minmax(75px, auto)">
                        <LayoutArea area="main">
                        <div style={{height: '100%'}}>
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
                                    <Button type="button" style="outline" size="small">Run</Button>
                                    </div>
                                </div>

                                {!!flag.rules.length ?
                                <>
                                    <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0'}}>
                                        The following rules will be evaluated for all visitors
                                        <DropdownGroup isOpen={false}></DropdownGroup>
                                    </div>
                                    <div>
                                    <RuleList items={flag.rules}></RuleList>
                                    </div>
                                </> :
                                <>
                                    <div style={{display: 'flex', width: '100%', margin: '8px 0px', paddingTop: '16px'}} onClick={() => onRuleSelect(rule)}>
                                                <div style={{margin: '0 8px 0 16px'}}>1</div>
                                                <div style={{border: '0.5px solid gray',
                                        borderRadius: '2px',
                                        padding: '15px',
                                        width: '100%'}}>
                                            Add rules to customize delivery or run an experiment
                                            <DropdownGroup isOpen={false}></DropdownGroup>
                                                </div>
                                            </div>
                                </>
                                }
                            </div>
                        </div>
                        </LayoutArea>
                        <LayoutArea area="config">
                        <div style={{height: '100%'}}>
                            {(!selectedRule) && <div>Select a rule to edit</div>}
                            {/* {!flag.rules.length && <div>Add a rule to customize delivery or run an experiment</div>} */}
                            {selectedRule && <div>
                                <h1>Rule</h1>

                                <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid gray', paddingBottom: '16px'}}>
                                    <div style={{display: 'flex'}}>
                                        <div style={{textAlign: 'left', marginRight: '15px'}}>
                                            <div>Environment</div>
                                            <div>Production</div>
                                        </div>
                                        <div style={{textAlign: 'left'}}>
                                            <div>Status</div>
                                            <div>{selectedRule.status}</div>
                                        </div>
                                    </div>

                                    <div>
                                    <Button style="outline">Run</Button>
                                    </div>
                                </div>
                                
                                <div>
                                    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                                        <label htmlFor="name">Name</label>
                                        <input style={{width: '100%'}} type="text" id="name" placeholder={selectedRule.name}/>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
                                        <label htmlFor="key">Key</label>
                                        <input style={{width: '100%'}} type="text" id="key" placeholder={selectedRule.key} disabled/>
                                        <small>Rule keys can't be changed after they're created</small>
                                    </div>

                                    <div style={{display: 'flex', width: '100%'}}>
                                        <div style={{width: '100%'}}>
                                            <div>
                                                <span>Variations</span>
                                            </div>
                                            <div style={{display: 'flex'}}>
                                                <div>1</div>
                                                <div style={{width: '100%'}}>
                                                    <button style={{width: '100%'}}>Off</button>
                                                </div>
                                            </div>
                                            <div style={{display: 'flex'}}>
                                                <div>2</div>
                                                <div style={{width: '100%'}}>
                                                    <button style={{width: '100%'}}>On</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div>
                                                <span>Distribution</span>
                                            </div>
                                            <div>
                                                <div>
                                                    <input value="0" style={{width: '50px'}}/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <input value="100%" style={{width: '50px'}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        </LayoutArea>
                        <LayoutArea area="form-controls">
                            <div>
                                <Button type="button" style="plain">Revert</Button>
                                <Button type="button"style="highlight" isDisabled={true}>Save</Button>
                            </div>
                        </LayoutArea>
                    </LayoutGrid>
                }

                {(!isLoading && !flag) && 
                    <div>
                        <div>Error!</div>
                    </div>
                }
            </div>
        // </FlagDetailViewContext>
    )
}