import { ProgressBarStep } from "../ProgressBarStep/PorgressBarStep";
import "./ProgressBar.css";

export const ProgressBar = ({steps, currentStep}) => {
    return (
        <div className="progress-bar">
            {steps.map((_, idx) => {
                return (
                    <ProgressBarStep step={idx + 1} isActive={currentStep === idx ? true : false}/>
                )
            })}
        </div>
    )
}