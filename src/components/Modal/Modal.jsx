export const Modal = ({children, closeFunc}) => {
    return (
        <div style={{position: 'fixed', height: '100vh', width: '100vw'}}>
                    <div style={{ background: 'rgba(0,0,0,.5)', position: 'absolute', zIndex: '-1', height: '100%', width: '100%'}}></div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
<div style={{width: 'fit-content', height: 'fit-content', padding: '20px', background: 'lightgrey', borderRadius: '5px'}}>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <button style={{background: 'none'}} onClick={closeFunc}>X</button>
                    </div>
                    {children}
                </div>
                </div>
                </div>
    )
}