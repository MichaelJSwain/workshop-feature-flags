import './DropdownItem.css';

export const DropdownItem = ({children, role}) => {
    const classList = `ui-dropdown__item${role === "separator" ? " ui-dropdown__item--separator" : ""}`;

    return (
        <li className={classList} role={role}>{children}</li>
    )
}