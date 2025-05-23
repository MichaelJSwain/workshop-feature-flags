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
import { LoadingView } from "../../components/LoadingView/LoadingView.jsx";
import { createPortal } from "react-dom";
import { Modal } from "../../components/Modal/Modal.jsx";
import { RuleModal } from "../../components/RuleModal/RuleModal.jsx";

export const FlagDetailView = () => {
    const {flag, isLoading, onDeleteRule, isShowingError, setIsShowingError, errorMessage} = useContext(DetailViewContext);
    const [selectedRule, setSelectedRule] = useState(null);
    const [isShowingRuleForm, setIsShowingRuleForm] = useState(false);

    const handleRuleFormTrigger = (selectedRule = null) => {
        setSelectedRule(selectedRule);
        setIsShowingRuleForm(true);
    }
    
    const handleDeleteRule = (ruleID) => {
        onDeleteRule(ruleID);
    }

    return (
            <div style={{height: '100%'}}>
                {isLoading && <LoadingView></LoadingView>}

                {flag && 
                    <>
                    
                    <div style={{textAlign: "left", margin: "20px 20px 40px"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                            <div style={{display: "flex"}}>
                                <h1 style={{margin: "0px", marginRight: "10px"}}>{flag.name}</h1>
                                <div style={{background: flag.status === "paused" ? "pink" : "green", color: "white", fontWeight: "bold", padding: "5px 10px", borderRadius: "25px", display: "flex", alignItems: "center"}}>
                                    {flag.status}
                                </div>
                            </div>
                            <div>
                                <div>
                                    Key: {flag.key}
                                </div>
                                <div>
                                    Project ID: {flag.project_id}
                                </div>
                            </div>
                            </div>
                            <button style={{height: "fit-content"}}>{flag.status === "running" ? "Pause" : "Start"}</button>
                        </div>
                    </div>

                     {isShowingRuleForm && createPortal(<RuleModal closeModal={() => setIsShowingRuleForm(false)} selectedRule={selectedRule}></RuleModal>,
                    document.getElementById('react_portal')
                    )} 
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

                {isShowingError && createPortal(<Modal submitFunc={() => {setIsShowingError(false);}} closeFunc={() => setIsShowingError(false)} header={errorMessage.header} cta="Ok">
                        <p>{errorMessage.message}</p>
                    </Modal>,
                    document.getElementById('react_portal')
                    )}
            </div>
    )
}