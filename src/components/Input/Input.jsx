export const Input = ({label, value, type, displayError, isDisabled, isRequired, note, placeholder, onChange}) => {
    return (
        <input placeholder={placeholder} value={value} onChange={onChange}></input>
    )
}