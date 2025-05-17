import { forwardRef, useImperativeHandle, useState } from "react"

export const RuleOverviewForm = forwardRef((props, ref) => {
    const {onChange, initialValues} = props;
    const [formData, setFormData] = useState({
        name: initialValues?.name || "",
        key: initialValues?.key || ""
    })
    const [formErrors, setFormErrors] = useState({
        name: {
            isError: false,
            message: "Please enter a name"
        },
        key: {
            isError: false,
            message: "Please enter a key"
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
                    key: false
                }
                if (formData.name === "") {
                    errors.name = true;
                } 
                if (formData.key === "") {
                    errors.key = true;
                }
           
                if (errors.name || errors.key) {
                    setFormErrors(prevValue => {
                        const copy = {...prevValue};
                        copy.name.isError = errors.name;
                        copy.key.isError = errors.key;
                        return copy;
                    })
                    return {isValid: false, message: "Invalid name or key"}
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
        </div>
    )
})