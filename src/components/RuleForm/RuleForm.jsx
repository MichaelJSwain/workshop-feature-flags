import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from "react";
import { DetailViewContext } from "../../FlagDetailViewContext";

export const RuleForm = forwardRef((props, ref) => {
    const {initialValues, submitFunc} = props;
    const [currentStep, setCurrentStep] = useState(1);
    const [ruleForm, setRuleForm] = useState(initialValues);
    const {addRule} = useContext(DetailViewContext);
   

  useImperativeHandle(ref, () => ({
    handleSubmitOrNext() {
      if (currentStep < 2) {
          setCurrentStep(prevValue => {
                return prevValue + 1;
            });
        return {isLastStep: false}
      } else if (currentStep === 2 ) {
          setCurrentStep(prevValue => {
                return prevValue + 1;
            });
        return {isLastStep: true}
      } else {
        submitFunc(ruleForm);
        return {hasSubmitted: true}
      }
    },
  }));



          useEffect(() => {
            setRuleForm(initialValues)
          }, [initialValues]);
    
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
                    percentage_included: !remainder || idx != (variants.length - 1) ? splitPerVariant : remainder
                }
            });
            return variantsWithTrafficAllocation;
          };
    
        const addVariation = () => {
            const newVariation = {
                name: `Variation ${ruleForm.variations.length}`,
                key: ruleForm.variations.length + 1,
                variation_id: Math.ceil(Math.random() * 100000)
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
    
    return (
            <>
                {currentStep === 1 && <>
                                        <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                        <label htmlFor="name" style={{textAlign: "left"}}>Rule name:</label>
                        <input type="text" id="name" name="name" onChange={handleRuleFormChange} value={ruleForm.name}/>
                    </fieldset>
                    <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                        <label htmlFor="key" style={{textAlign: "left"}}>Rule key:</label>
                        <input type="text" id="key" name="key" onChange={handleRuleFormChange} value={ruleForm.key}/>
                    </fieldset>
                    <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                        <label htmlFor="hypothesis" style={{textAlign: "left"}}>Rule hypothesis:</label>
                        <input type="text" id="hypothesis" name="hypothesis" onChange={handleRuleFormChange} value={ruleForm.hypothesis}/>
                    </fieldset>
                    <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                        <label htmlFor="description" style={{textAlign: "left"}}>Rule description:</label>
                        <input type="text" id="description" name="description" onChange={handleRuleFormChange} value={ruleForm.description}/>
                    </fieldset>
                </>}

                    {currentStep === 2 && <>
                        <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                            <label htmlFor="percentage" style={{textAlign: "left"}}>Percentage included:</label>
                            <input type="text" id="percentage" name="percentage_included" onChange={handleRuleFormChange} value={ruleForm.percentage_included}/>
                        </fieldset>
                    </>
                    }

                    {currentStep === 3 && <>
                                        <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
                        <label htmlFor="variants" style={{textAlign: "left"}}>Variants:</label>
                        <div style={{display: "flex", flexDirection: "column", marginBottom: "10px"}}>
                            {ruleForm.variations.map((variation, index) => {
                                return <div key={index}>
                                        <input type="text" value={variation.name} onChange={(e) => updateVariation(index, "name", e.target.value)}/>
                                        <span>
                                            <input type="number" onChange={(e) => updateVariation(index, "percentage_included", e.target.value)} value={variation.percentage_included}/>
                                            %
                                        </span>
                                        {ruleForm.variations.length > 2 && <button onClick={() => deleteVariation(index)}>Delete</button>}
                                    </div>
                            })}
                        </div>
                        <button type="button" onClick={addVariation}>+ Add variation</button>
                    </fieldset>
                    </>}

       </>
    )
});