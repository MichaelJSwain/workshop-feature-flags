import { useState } from "react"
import { Button } from "../Button/Button";
import { ClickAwayListener } from "../ClickAwayListener";
import { DropdownContents } from "../DropdownContents/DropdownContents";

export const DropdownGroup = ({children, open}) => {
    const [isOpen, setIsOpen] = useState(open);

    return (
        <div>
            <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                <Button type="button" size="small" style="outline" onClick={() => setIsOpen(true)}>Add Rule</Button>
                {isOpen && <div style={{position: "relative"}}>
                        <DropdownContents></DropdownContents>
                    </div>}
            </ClickAwayListener>
        </div>
    )
}