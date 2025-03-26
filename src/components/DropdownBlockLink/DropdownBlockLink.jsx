import './DropdownBlockLink.css'

export const DropdownBlockLink = ({children, onClick, }) => {
    return (
        <div className="ui-dropdown__block-link" onClick={onClick}>{children}</div>
    )
}