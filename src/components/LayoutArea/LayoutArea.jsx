import './LayoutArea.css'

export const LayoutArea = ({children, area}) => {
    return (
        <div className={`layout-area layout-area_${area}`}>
            {children}
        </div>
    )
}