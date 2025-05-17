import { forwardRef, useImperativeHandle, useState } from "react"

export const RuleVariationsForm = forwardRef((props, ref) => {
    const {initialValues} = props;
    const [formData, setFormData] = useState({
        variations: initialValues?.variations || [{ name: 'Control', key: 1, variation_id: 2348324, percentage_included: 5000 },{ name: 'Variation 1', key: 2, variation_id: 2834908, percentage_included: 50000 }]
    });

        const updateVariation = (index, field, value) => {
            const updatedVariations = [...formData.variations];
            updatedVariations[index][field] = value;
            setFormData(prev => ({
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
                name: `Variation ${formData.variations.length}`,
                key: formData.variations.length + 1,
                variation_id: Math.ceil(Math.random() * 100000)
            }
            const updatedVariations = getTrafficAllocationPerVariant(10000, [...formData.variations, newVariation]);
            const updatedForm = {...formData, variations: updatedVariations};
            setFormData(updatedForm);
        }
    
        const deleteVariation = (selectedVariationIndex) => {
            const filteredVariations = formData.variations.filter((variation, index) => {
                return index != selectedVariationIndex;
            });
            const updatedVariations = getTrafficAllocationPerVariant(10000, filteredVariations);
            const updatedForm = {...formData, variations: updatedVariations};
            setFormData(updatedForm);
        }
    
        useImperativeHandle(ref, () => {
            return {
                validate: () => {
                    return {isValid: true}
                },
                getFormData: () => {
                    return formData;
                }
            }
        });
    

    return (
        <>
                    <fieldset style={{display: "flex", flexDirection: "column", border: "none"}}>
    <label htmlFor="variants" style={{textAlign: "left"}}>Variants:</label>
    <div style={{display: "flex", flexDirection: "column", marginBottom: "10px"}}>
        {formData.variations.map((variation, index) => {
            return <div key={index}>
                    <input type="text" value={variation.name} onChange={(e) => updateVariation(index, "name", e.target.value)}/>
                    <span>
                        <input type="number" onChange={(e) => updateVariation(index, "percentage_included", e.target.value)} value={variation.percentage_included}/>
                        %
                    </span>
                    {formData.variations.length > 2 && <button onClick={() => deleteVariation(index)}>Delete</button>}
                </div>
        })}
    </div>
    <button type="button" onClick={addVariation}>+ Add variation</button>
</fieldset>
</>
    )
});