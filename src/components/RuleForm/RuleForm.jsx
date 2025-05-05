import { useEffect, useState } from "react";

export const RuleForm = ({initialValues, submitFunc}) => {
      const [ruleForm, setRuleForm] = useState(initialValues);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        submitFunc(ruleForm);
    }
    
    return (
        <div>
            <h1>Add new rule</h1>
            <form onSubmit={handleSubmit}>
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
                    <input type="text" id="percentage" name="percentage_included" onChange={handleRuleFormChange} value={ruleForm.percentage_included}/>
                </fieldset>
                <fieldset style={{display: "flex", flexDirection: "column"}}>
                    <label htmlFor="variants">Variants:</label>
                    <div style={{display: "flex", flexDirection: "column"}}>
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

                <button type="submit">Save</button>
            </form>
        </div>
    )
}