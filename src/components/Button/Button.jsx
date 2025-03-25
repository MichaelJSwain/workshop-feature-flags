import './Button.css'

export const Button = ({children, ariaLabel, type = "button", isDisabled, isLink, isLoading, isSubmit, loadingText, onClick, style, width, size}) => {
    const classList = `ui-button ui-button-${style} ${size ? `ui-button-${size}` : ''}`;

    return (
        <button className={classList} type={type} onClick={onClick}>{children}</button>
    )
}