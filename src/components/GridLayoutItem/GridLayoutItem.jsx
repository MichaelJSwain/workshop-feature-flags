export const GridLayoutItem = ({children, columns, rows}) => {
    return (
        <div style={{gridColumn: columns}}>
            {children}
        </div>
    )
}