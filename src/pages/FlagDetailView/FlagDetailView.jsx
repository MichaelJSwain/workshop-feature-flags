import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { LayoutArea } from "../../components/LayoutArea/LayoutArea";
import { LayoutGrid } from "../../components/LayoutGrid/LayoutGrid";
import { Button } from "../../components/Button/Button";
import { DropdownGroup } from "../../components/DropdownGroup/DropdownGroup";
import { RuleList } from "../../components/RuleList/RuleList";
import { DetailViewContext } from "../../FlagDetailViewContext.jsx"
import { GridLayout } from "../../components/GridLayout/GridLayout.jsx";
import { GridLayoutItem } from "../../components/GridLayoutItem/GridLayoutItem.jsx";
import { Input } from "../../components/Input/Input.jsx";
import { RuleForm } from "../../components/RuleForm/RuleForm.jsx";

const emptyRule = {
    name: '',
    key: '',
    description: '',
    hypothesis: '',
    percentage_included: 100,
    variations: [
      { name: 'Control', key: 1, variation_id: 2348324, percentage_included: 5000 },
      { name: 'Variation 1', key: 2, variation_id: 2834908, percentage_included: 50000 }
    ]
  }

export const FlagDetailView = () => {
    const {flag, isLoading, onRuleSelect, addRule, updateRule, deleteRule} = useContext(DetailViewContext);
    const [selectedRule, setSelectedRule] = useState(null);
    const [isShowingRuleForm, setIsShowingRuleForm] = useState(false);

    const handleAddRule = (ruleForme) => {
        // validation logic...

        // send validated rule
        addRule(ruleForme);
        setIsShowingRuleForm(false);
    }

    const handleUpdateRule = (ruleForm, id) => {
        // validation logic...

        // send validated rule
        console.log("updating rule");
        updateRule(ruleForm);
        setIsShowingRuleForm(false);
    }

    const handleRuleFormTrigger = (selectedRule = null) => {
        console.log("handle rule form trigger with selected rule = ", selectedRule);
        setSelectedRule(selectedRule);
        setIsShowingRuleForm(true);
    }
    
    const handleDeleteRule = (ruleId) => {
        deleteRule(ruleId)
    }

    return (
            <div style={{height: '100%'}}>
                <Link to="/flags">Back</Link>
                {isLoading && <div>Loading...</div>}

                {(!isLoading && flag) && 
                    <>
                    
                     {isShowingRuleForm && <RuleForm initialValues={selectedRule || emptyRule} submitFunc={selectedRule ? handleUpdateRule : handleAddRule}></RuleForm>}
                     <div style={{border: "1px solid black", padding: "20px 30px"}}>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
                        <h2 style={{textAlign: "left", margin: "0px"}}>Rules</h2>
                        <button onClick={() => handleRuleFormTrigger()}>Add Rule</button>
                    </div>
                    <div>
                        
                        { (flag.rulesConfigs && flag.rulesConfigs.length) ? flag.rulesConfigs.map(ruleConfig => {
                            return <div key={Math.random() * 10000} style={{borderRadius: "8px", border: "1px solid gray", marginBottom: "20px", padding: "30px"}}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <div style={{display: "flex", gap: "10px"}}>
                                            <h2 style={{margin: "0px"}}>Rule: {ruleConfig.name}</h2>
                                            <div style={{background: ruleConfig.status === "paused" ? "pink" : "green", color: "white", fontWeight: "bold", padding: "5px 10px", borderRadius: "25px", display: "flex", alignItems: "center"}}>
                                                {ruleConfig.status}
                                            </div>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => {handleRuleFormTrigger(ruleConfig)}} style={{marginRight: "10px"}}>Update</button>
                                            <button type="button" onClick={() => handleDeleteRule(ruleConfig.id)}>Delete</button>
                                        </div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div>
                                            Key:
                                        </div>
                                        <div>
                                            {ruleConfig.key}
                                        </div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <div>
                                            Traffic Allocation:
                                        </div>
                                        <div>
                                            {ruleConfig.percentage_included}
                                            %
                                        </div>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Variation:</td>
                                                <td>Distribution:</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {ruleConfig.variations.map(v => {
                                            return ( 
                                                <tr key={v.variation_id}>
                                                    <td>{v.name}</td>
                                                    <td>{v.percentage_included}%</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            
                        }) : <p>no rules have been added yet</p>}
                    </div>
                    </div>
                    </>
                }

                {(!isLoading && !flag) && 
                    <div>
                        <div>Error!</div>
                    </div>
                }
            </div>
    )
}