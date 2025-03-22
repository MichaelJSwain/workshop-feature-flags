export const Modal = ({children, closeFunc, submitFunc, header, cta}) => {
    return (
        <div style={{position: 'fixed', height: '100vh', width: '100vw'}}>
                    <div className='modal-overlay' style={{ background: 'rgba(0,0,0,.5)', position: 'absolute', zIndex: '-1', height: '100%', width: '100%'}}></div>
                    <div className='modal' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
<div style={{width: 'fit-content', height: 'fit-content', padding: '20px', background: 'lightgrey', borderRadius: '5px'}}>
                    <form onSubmit={(e) => {e.preventDefault(); submitFunc(e); closeFunc(false);}}>
                        <div className="modal-header" style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div>
                                <h4 className="modal-title">{header}</h4>
                            </div>
                            <button style={{background: 'none'}} onClick={closeFunc}>X</button>
                        </div>
                        
                        <div className="modal-content">
                            {children}
                        </div>
                        
                        <div className="modal-footer" style={{marginTop: '15px', display: 'flex', justifyContent: 'flex-end'}}>
                            <button onClick={closeFunc} style={{background: 'none', marginRight: '15px'}}>Cancel</button>
                            <button type="submit">{cta}</button>
                        </div>

                    </form>
                </div>
                </div>
                </div>
    )
}