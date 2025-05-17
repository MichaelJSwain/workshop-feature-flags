import "./ProgressBarStep.css";

export const ProgressBarStep = ({step, isActive}) => {
    return (
        <div className={isActive ? "progress-bar-step active": "progress-bar-step"}>
            {step}
        </div>
    )
}