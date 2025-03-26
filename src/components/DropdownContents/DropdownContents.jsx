import { DropdownBlockLink } from "../DropdownBlockLink/DropdownBlockLink"
import { DropdownItem } from "../DropdownItem/DropdownItem"
import { Typography } from "../Typography/Typography"
import './DropdownContents.css'

export const DropdownContents = () => {
    return (
        <ul className="ui-dropdown">
            <DropdownItem role="separator">
                <Typography type="xs" tag="span">Add New Rule</Typography>
            </DropdownItem>
            <DropdownItem role="menu-item">
                <DropdownBlockLink onClick={() => console.log("link click!")}>
                    <Typography type="body" tag="span">A/B Test</Typography>
                    <div>
                        <Typography type="xs" tag="span">Test multiple variations of your flag to find the best one.</Typography>
                    </div>
                </DropdownBlockLink>
            </DropdownItem>
            <DropdownItem role="menu-item">
                <DropdownBlockLink onClick={() => console.log("link click!")}>
                    <Typography type="body" tag="span">Targeted Delivery</Typography>
                    <div>
                        <Typography type="xs" tag="span">Deliver your flag to visitors that match a specific audience.</Typography>
                    </div>
                </DropdownBlockLink>
            </DropdownItem>
            <DropdownItem role="menu-item">
                <DropdownBlockLink onClick={() => console.log("link click!")}>
                    <Typography type="body" tag="span">Multi-Armed Bandit</Typography>
                    <div>
                        <Typography type="xs" tag="span">Use machine learning to dynamically allocate traffic to the best-performing variation.</Typography>
                    </div>
                </DropdownBlockLink>
            </DropdownItem>
        </ul>
    )
}