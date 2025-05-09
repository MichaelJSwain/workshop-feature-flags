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
                    <button onClick={() => handleRuleFormTrigger()}>Add Rule</button>
                     {isShowingRuleForm && <RuleForm initialValues={selectedRule || emptyRule} submitFunc={selectedRule ? handleUpdateRule : handleAddRule}></RuleForm>}

                    { flag.rulesConfigs && flag.rulesConfigs.map(ruleConfig => {
                        return <div key={Math.random() * 10000} >
                                <span onClick={() => {
                            handleRuleFormTrigger(ruleConfig)
                            }}>{ruleConfig.key}</span>
                                <span>
                                    <button type="button" onClick={() => handleDeleteRule(ruleConfig.id)}>Delete</button>
                                </span>
                            </div>
                    })}
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