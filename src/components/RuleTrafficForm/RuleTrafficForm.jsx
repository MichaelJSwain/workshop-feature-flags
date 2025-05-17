import { forwardRef, useImperativeHandle, useState } from "react"

export const RuleTrafficForm = forwardRef((props, ref) => {
    const {onChange, initialValues} = props;
    const [formData, setFormData] = useState({
        percentage_included: initialValues?.percentage_included || 100
    });
    const [formErrors, setFormErrors] = useState({
        traffic: {
            isError: false,
            message: "Traffic must be 100%"
        }
    });

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
                    traffic: false
                }
                if (formData.percentage_included < 100) {
                    errors.traffic = true;
                }

                if (errors.traffic) {
                    setFormErrors(prevValue => {
                        const copy = {...prevValue};
                        copy.traffic.isError = errors.traffic;
                        return copy
                    });
                    return {isValid: false, message: "Invalid name or key"};
                }
                return {isValid: true, message: "Success"};
            },
            getFormData: () => {
                return formData;
            }
        }
    })

    return (
        <div>
            <fieldset>
                <label>Traffic:</label>
                <input name="percentage_included" onChange={handleOnChange} value={formData.percentage_included}></input>
                {formErrors.traffic.isError && <div>{formErrors.traffic.message}</div>}
            </fieldset>
        </div>
    )
})