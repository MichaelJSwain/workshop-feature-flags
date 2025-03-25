import './LayoutGrid.css'

export const LayoutGrid = ({children, areas, columns, gap, rows}) => {
    return (
        <div className='layout-grid' style={{display: 'grid', gridTemplateAreas:`${areas}`, gridTemplateColumns: `${columns}`, gridTemplateRows: `${rows}`, gap: `${gap}`}}>
            {children}
        </div>
    )
}