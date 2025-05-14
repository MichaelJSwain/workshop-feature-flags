import { useState } from "react";
import { Modal } from "./Modal/Modal";
import { createPortal } from "react-dom";
import { ClickAwayListener } from "./ClickAwayListener";
import { Link } from "react-router-dom";
import { Button } from "./Button/Button";

export const TableRow = ({flag, handleExperimentStateChange, handleDeleteFlag}) => {
    const [isShowingTooltip, setIsShowingTooltip] = useState(false);
    const [isShowingWarning, setIsShowingWarning] = useState(false);

    return <tr key={flag.id}>
    <td>
        <Link to={`/flags/${flag.key}`}>{flag.name}</Link>
    </td>
    <td>{flag.type}</td>
    <td>{flag.status}</td>
    <td>
        {isShowingWarning && createPortal(
        <Modal closeFunc={() => setIsShowingWarning(false)} submitFunc={() => {handleExperimentStateChange(flag); setIsShowingWarning(false);}} header="Toggle Flag" cta="Confirm">
            <div>
                Are you sure you want to set the status of this experiment to  
                <strong>{flag.status === 'running' ? ' paused' : ' running'}?</strong>
            </div>
        </Modal>,
        document.getElementById('react_portal')
        )}
        <Button style="outline" onClick={(e) => setIsShowingWarning(true)}>{flag.status === "running" ? "pause" : "start"}</Button>
    </td>
    <td>
        <ClickAwayListener onClickAway={() => {setIsShowingTooltip(false)}}>
            <a href="#" onClick={() => setIsShowingTooltip(!isShowingTooltip)} className="text-dark" style={{fontSize: '1.5rem'}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg></a>
                <div style={{ display: isShowingTooltip ? 'block' : 'none', position: 'absolute', padding: '10px', background: 'white', color: 'black', width: '220px', right: '10%', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.17)', borderRadius: '5px'}}>
                    <ul style={{margin: '0px', padding: '0px', listStyle: 'none'}}>
                        <li style={{padding: '5px', cursor: 'pointer'}}>Archive</li>
                        <li style={{padding: '5px', cursor: 'pointer'}} onClick={() => handleDeleteFlag(flag)}>Delete</li>
                    </ul>
                </div>
        </ClickAwayListener>
    </td>
</tr>
};