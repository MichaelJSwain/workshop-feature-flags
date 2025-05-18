import { forwardRef, useImperativeHandle, useState } from "react"

export const RuleOverviewForm = forwardRef((props, ref) => {
    const {onChange, initialValues} = props;
    const [formData, setFormData] = useState({
        name: initialValues?.name || "",
        key: initialValues?.key || "",
        description: initialValues?.description || "",
        hypothesis: initialValues?.hypothesis || "",
    })
    const [formErrors, setFormErrors] = useState({
        name: {
            isError: false,
            message: "Please enter a name"
        },
        key: {
            isError: false,
            message: "Please enter a key"
        },
        description: {
            isError: false,
            message: "Please enter a description"
        },
        hypothesis: {
            isError: false,
            message: "Please enter a hypothesis"
        }
    })

    const handleOnChange = (e) => {
        setFormData(prevValues => {
            const updatedValues = {...prevValues};
            updatedValues[e.target.name] = e.target.value;
            return updatedValues;
        })
    }

    useImperativeHandle(ref, () => {
        return {
            validate: () => {
                const errors = {
                    name: false,
                    key: false,
                    description: false,
                    hypothesis: false
                }
                if (formData.name === "") {
                    errors.name = true;
                } 
                if (formData.key === "") {
                    errors.key = true;
                }
                if (formData.description === "") {
                    errors.description = true;
                }
                if (formData.hypothesis === "") {
                    errors.hypothesis = true;
                }
           
                if (errors.name || errors.key) {
                    setFormErrors(prevValue => {
                        const copy = {...prevValue};
                        copy.name.isError = errors.name;
                        copy.key.isError = errors.key;
                        copy.description.isError = errors.description;
                        copy.hypothesis.isError = errors.hypothesis;
                        return copy;
                    })
                    return {isValid: false, message: "Invalid name, key, description, hypothesis"}
                }

                return {isValid: true, message: "Success"}

                
            },
            getFormData: () => {
                return formData;
            }
        };
    })

    return (
        <div>
            <fieldset>
                <label>Name:</label>
                <input name="name" onChange={handleOnChange} value={formData.name}></input>
                {formErrors.name.isError && <div>{formErrors.name.message}</div>}
            </fieldset>
            <fieldset>
                <label>Key:</label>
                <input name="key" onChange={handleOnChange} value={formData.key}></input>
                {formErrors.key.isError && <div>{formErrors.key.message}</div>}
            </fieldset>
            <fieldset>
                <label>Description:</label>
                <input name="description" onChange={handleOnChange} value={formData.description}></input>
                {formErrors.description.isError && <div>{formErrors.description.message}</div>}
            </fieldset>
            <fieldset>
                <label>Hypothesis:</label>
                <input name="hypothesis" onChange={handleOnChange} value={formData.hypothesis}></input>
                {formErrors.hypothesis.isError && <div>{formErrors.hypothesis.message}</div>}
            </fieldset>
        </div>
    )
})