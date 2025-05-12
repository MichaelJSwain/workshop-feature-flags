import './LoadingView.css'

export const LoadingView = () => {
    return (
        <div className='loading-view-container'>
            <div className='loading-message'>
                <div className='loading-spinner'></div>
                <h3>Loading...</h3>
            </div>
        </div>
    )
}