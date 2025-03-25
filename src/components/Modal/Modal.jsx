import { Button } from '../Button/Button';
import './Modal.css';

export const Modal = ({children, closeFunc, submitFunc, header, cta}) => {
    return (
        <div className="modal-container">
            <div className='modal-overlay'></div>
            <div className='modal'>
                <div className='modal-content'>
                    <form onSubmit={(e) => {e.preventDefault(); submitFunc(e); closeFunc(false);}}>
                        <div className="modal-header">
                            <div>
                                <h4 className="modal-title">
                                    {header}
                                </h4>
                            </div>
                            <button className='modal-close-btn' onClick={closeFunc}>X</button>
                        </div>
                        
                        <div className="modal-body">
                            {children}
                        </div>
                        
                        <div className="modal-footer">
                            <Button style="plain" type="button" onClick={closeFunc}>Cancel</Button>
                            <Button style="highlight" type="submit">{cta}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}