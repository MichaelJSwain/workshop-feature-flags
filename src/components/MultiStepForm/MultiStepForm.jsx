import { Children, cloneElement, createRef, forwardRef, useImperativeHandle, useRef, useState } from "react"
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const MultiStepForm = forwardRef((props, ref) => {
    const {children, submitFunc} = props;
    const [currentStep, setCurrentStep] = useState(0);

    const stepRefs = useRef([]);
    const steps = Children.toArray(children);
    stepRefs.current = steps.map((_, i) => stepRefs.current[i] || createRef());

    const stepsWithRefs = steps.map((step, idx) => {
        return cloneElement(step, {ref: stepRefs.current[idx]});
    })

    const getDataFromSteps = () => {
        let result = {};
        stepRefs.current.forEach(step => {
            const data = step.current.getFormData();
            result = {...result, ...data};
        });
        return result;
    }

    useImperativeHandle(ref, () => {
        return {
            handleStepOrSubmit: () => {
                const result = stepRefs.current[currentStep].current.validate();
                console.log(result);
                if (result.isValid) {
                    const totalSteps = steps.length - 1;

                    if (result.isValid && currentStep < (totalSteps)) {
                        const incrementedStep = currentStep + 1
                        setCurrentStep(incrementedStep);
                        console.log(stepRefs.current[currentStep].current.getFormData())
                        return {isLastStep: incrementedStep === (totalSteps) ? true : false};
                    } else if (result.isValid && currentStep === (totalSteps)) {
                        const formData = getDataFromSteps();
                        submitFunc(formData);
                        return {hasSubmitted: true};
                    }
                }
            },
            handleGoBack: () => {
                console.log("going back")
                if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                }
            }
        }
    })


    return (
        <div>
            <ProgressBar steps={steps} currentStep={currentStep}></ProgressBar>
            {stepsWithRefs.map((step, index) => (
            <div key={index} style={{ display: index === currentStep ? 'block' : 'none' }}>
                {step}
            </div>
            ))}
        </div>
    )
});