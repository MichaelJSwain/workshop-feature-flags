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

export const FlagDetailView = () => {
    const {flag, selectedRule, isLoading, onRuleSelect, addRule} = useContext(DetailViewContext)

    const [ruleForm, setRuleForm] = useState({
        name: '',
        key: '',
        description: '',
        hypothesis: '',
        percentageIncluded: 100,
        variations: [
          { name: 'Control', key: 1, variationId: 2348324, percentageIncluded: 5000 },
          { name: 'Variation 1', key: 2, variationId: 2834908, percentageIncluded: 50000 }
        ]
      });

    const handleRuleFormChange = (e) => {
        const { name, value } = e.target;
        setRuleForm(prev => ({
          ...prev,
          [name]: value
        }));
    }

    const updateVariation = (index, field, value) => {
        const updatedVariations = [...ruleForm.variations];
        updatedVariations[index][field] = value;
        setRuleForm(prev => ({
            ...prev,
            variations: updatedVariations
        }));
    };

    const getTrafficAllocationPerVariant = (totalTrafficAllocation, variants) => {
        const splitPerVariant = Math.trunc(totalTrafficAllocation / variants.length);
        let remainder;
        if (splitPerVariant * variants.length == totalTrafficAllocation) {
            remainder = false;
        } else {
            remainder = totalTrafficAllocation - (splitPerVariant * (variants.length - 1));
        }
      
        const variantsWithTrafficAllocation = variants.map((variant, idx) => {
            return {
                ...variant,
                percentageIncluded: !remainder || idx != (variants.length - 1) ? splitPerVariant : remainder
            }
        });
        return variantsWithTrafficAllocation;
      };

    const addVariation = () => {
        const newVariation = {
            name: `Variation ${ruleForm.variations.length}`,
            key: ruleForm.variations.length + 1,
            variationId: Math.ceil(Math.random() * 100000)
        }
        const updatedVariations = getTrafficAllocationPerVariant(10000, [...ruleForm.variations, newVariation]);
        const updatedForm = {...ruleForm, variations: updatedVariations};
        setRuleForm(updatedForm);
    }

    const deleteVariation = (selectedVariationIndex) => {
        const filteredVariations = ruleForm.variations.filter((variation, index) => {
            return index != selectedVariationIndex;
        });
        const updatedVariations = getTrafficAllocationPerVariant(10000, filteredVariations);
        const updatedForm = {...ruleForm, variations: updatedVariations};
        setRuleForm(updatedForm);
    }

    const handleAddRule = (e) => {
        e.preventDefault();
        // validation logic...

        // send validated rule
        addRule(ruleForm);
    }

    return (
        // <FlagDetailViewContext>
            <div style={{height: '100%'}}>
                <Link to="/flags">Back</Link>
                {isLoading && <div>Loading...</div>}

                
                {(!isLoading && flag) && 
                    
                    <>
                    <div>
                        <h1>Add new rule</h1>
                        <form onSubmit={handleAddRule}>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="name">Rule name:</label>
                                <input type="text" id="name" name="name" onChange={handleRuleFormChange} value={ruleForm.name}/>
                            </fieldset>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="key">Rule key:</label>
                                <input type="text" id="key" name="key" onChange={handleRuleFormChange} value={ruleForm.key}/>
                            </fieldset>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="hypothesis">Rule hypothesis:</label>
                                <input type="text" id="hypothesis" name="hypothesis" onChange={handleRuleFormChange} value={ruleForm.hypothesis}/>
                            </fieldset>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="description">Rule description:</label>
                                <input type="text" id="description" name="description" onChange={handleRuleFormChange} value={ruleForm.description}/>
                            </fieldset>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="percentage">Percentage included:</label>
                                <input type="text" id="percentage" name="percentageIncluded" onChange={handleRuleFormChange} value={ruleForm.percentageIncluded}/>
                            </fieldset>
                            <fieldset style={{display: "flex", flexDirection: "column"}}>
                                <label htmlFor="variants">Variants:</label>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    {ruleForm.variations.map((variation, index) => {
                                        return <div key={index}>
                                                <input type="text" value={variation.name} onChange={(e) => updateVariation(index, "name", e.target.value)}/>
                                                <span>
                                                    <input type="number" onChange={(e) => updateVariation(index, "percentageIncluded", e.target.value)} value={variation.percentageIncluded}/>
                                                    %
                                                </span>
                                                {ruleForm.variations.length > 2 && <button onClick={() => deleteVariation(index)}>Delete</button>}
                                            </div>
                                    })}
                                </div>
                                <button type="button" onClick={addVariation}>+ Add variation</button>
                            </fieldset>

                            <button type="submit">Save</button>
                        </form>
                    </div>


                    { flag.rulesConfigs && flag.rulesConfigs.map(ruleConfig => {
                        return <p key={ruleConfig.id}>{ruleConfig.key}</p>
                    })}
                    </>
                    

                    // <LayoutGrid areas={`'main config' 'form-controls form-controls'`} columns="1fr 1fr" gap="0px" rows="1fr minmax(75px, auto)">
                    //     <LayoutArea area="main">
                    //     <div style={{height: '100%'}}>
                    //         <h1>{flag.name}</h1>
                    //         <h5>{flag.key}</h5>

                            
                    //         <div>
                    //             <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid gray', paddingBottom: '16px'}}>
                    //                 <div style={{display: 'flex'}}>
                    //                     <div style={{textAlign: 'left', marginRight: '15px'}}>
                    //                         <div>Environment</div>
                    //                         <div>Production</div>
                    //                     </div>
                    //                     <div style={{textAlign: 'left'}}>
                    //                         <div>Status</div>
                    //                         <div>Draft</div>
                    //                     </div>
                    //                 </div>

                    //                 <div>
                    //                 <Button type="button" style="outline" size="small">Run</Button>
                    //                 </div>
                    //             </div>

                    //             {!!flag.rules.length ?
                    //             <>
                    //                 <div style={{display: 'flex', justifyContent: 'space-between', padding: '16px 0'}}>
                    //                     The following rules will be evaluated for all visitors
                    //                     <Button type="button" style="outline" size="small" onClick={() => setIsShowCreateRuleModal(true)}>Add rule</Button>
                    //                     {/* <DropdownGroup isOpen={false}></DropdownGroup> */}
                    //                 </div>
                    //                 <div>
                    //                 <RuleList items={flag.rules}></RuleList>
                    //                 </div>
                    //             </> :
                    //             <>
                    //                 <div style={{display: 'flex', width: '100%', margin: '8px 0px', paddingTop: '16px'}} onClick={() => onRuleSelect(rule)}>
                    //                             <div style={{margin: '0 8px 0 16px'}}>1</div>
                    //                             <div style={{border: '0.5px solid gray',
                    //                     borderRadius: '2px',
                    //                     padding: '15px',
                    //                     width: '100%'}}>
                    //                         Add rules to customize delivery or run an experiment
                    //                         <DropdownGroup isOpen={false}></DropdownGroup>
                    //                             </div>
                    //                         </div>
                    //             </>
                    //             }
                    //         </div>
                    //     </div>
                    //     </LayoutArea>
                    //     <LayoutArea area="config">
                    //     <div style={{height: '100%'}}>
                    //         {(!selectedRule) && <div>Select a rule to edit</div>}
                    //         {/* {!flag.rules.length && <div>Add a rule to customize delivery or run an experiment</div>} */}
                    //         {selectedRule && <div>
                    //             <h1>Rule</h1>

                    //             <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '0.5px solid gray', paddingBottom: '16px'}}>
                    //                 <div style={{display: 'flex'}}>
                    //                     <div style={{textAlign: 'left', marginRight: '15px'}}>
                    //                         <div>Environment</div>
                    //                         <div>Production</div>
                    //                     </div>
                    //                     <div style={{textAlign: 'left'}}>
                    //                         <div>Status</div>
                    //                         <div>{selectedRule.status}</div>
                    //                     </div>
                    //                 </div>

                    //                 <div>
                    //                 <Button style="outline">Run</Button>
                    //                 </div>
                    //             </div>
                                
                    //             <div>
                    //                 <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '20px'}}>
                    //                     <label htmlFor="name">Name</label>
                    //                     <Input type="text" placeholder={selectedRule.name} value={nameFieldText} onChange={(e) =>  handleInputChange(e)}></Input>
                    //                     {/* <input style={{width: '100%'}} type="text" id="name" placeholder={selectedRule.name}/> */}
                    //                 </div>
                    //                 <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginBottom: '20px'}}>
                    //                     <label htmlFor="key">Key</label>
                    //                     <input style={{width: '100%'}} type="text" id="key" placeholder={selectedRule.key} disabled/>
                    //                     <small>Rule keys can't be changed after they're created</small>
                    //                 </div>

                    //                 {/* <div style={{display: 'grid', gridTemplateColumns: 'auto 3fr 1fr repeat(2, 0.25fr)', textAlign: 'left', gap: '10px'}}> */}
                    //                 <GridLayout columns='auto 3fr 1fr repeat(2, 0.25fr)' gap='10px'>
                    //                         <GridLayoutItem columns="1 / 3">
                    //                             <span>Variations</span>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem columns="3 / 6">
                    //                             <span>Distribution</span>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem columns="1">
                    //                             1
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             <Button width="full" className="text-left" style="outline" onClick={() => console.log("click")}>
                    //                                 <div style={{display: "flex"}}>
                    //                                     <div style={{flex: '1'}}>Off</div>
                    //                                     <div>\/</div>
                    //                                 </div>
                    //                             </Button>
                    //                         </GridLayoutItem>
                    //                       <GridLayoutItem>
                    //                             <div style={{display: 'flex'}}>
                    //                                 <input value="0" style={{width: 'fit-content'}}/>
                    //                                 <span style={{marginLeft: '5px'}}>%</span>
                    //                             </div>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             Delete
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             2
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>                                      
                    //                             <Button width="full" className="text-left" style="outline" onClick={() => console.log("click")}>
                    //                                 <div style={{display: "flex"}}>
                    //                                     <div style={{flex: '1'}}>Off</div>
                    //                                     <div>\/</div>
                    //                                 </div>
                    //                             </Button>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             <div style={{display: 'flex'}}>
                    //                                 <input value="100%" style={{width: 'fit-content'}}/>
                    //                                 <span style={{marginLeft: '5px'}}>%</span>
                    //                             </div>
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             Delete
                    //                         </GridLayoutItem>
                    //                         <GridLayoutItem>
                    //                             +
                    //                         </GridLayoutItem>
                    //                 </GridLayout>
                                     
                    //                 {/* </div> */}
                    //             </div>
                    //         </div>}
                    //     </div>
                    //     </LayoutArea>
                    //     <LayoutArea area="form-controls">
                    //         <div>
                    //             <Button type="button" style="plain">Revert</Button>
                    //             <Button type="button"style="highlight" isDisabled={true}>Save</Button>
                    //         </div>
                    //     </LayoutArea>
                    // </LayoutGrid>
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