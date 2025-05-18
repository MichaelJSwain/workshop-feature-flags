import "./ProgressBarStep.css";

export const ProgressBarStep = ({step, isActive, isComplete}) => {

    const getClassList = () => {
        let classes = "progress-bar-step-container";

        if (isActive) {
            classes += " active";
        } else if (isComplete) {
            classes += " complete";
        }
        
        return classes;
    }

    const classList = getClassList();

    return (
        <div className={classList}>
            <div className="progress-bar-step">
                {isComplete ? 
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg> : 
                    step
                }
            </div>
        </div>
    )
}