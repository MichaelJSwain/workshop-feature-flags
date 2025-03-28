export const GridLayout = ({children, columns, gap, rows}) => {
    return (
        <div style={{display: 'grid', gridTemplateColumns: columns, textAlign: 'left', gap: gap, rows: rows ? rows : 'auto'}}>
            {children}
        </div>

    )
}