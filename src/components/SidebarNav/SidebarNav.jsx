export const SidebarNav = () => {
    return (
        <div style={{position: "fixed", top: "0", height: "100vh", width: "240px", background: "#46456B", textAlign: "left", overflowY: "scroll"}}>
            <div style={{padding: "8px 20px"}}>
                <h3 style={{color: "white", fontWeight: "bold"}}>Workshop</h3>
            </div>
            <div style={{padding: "8px 20px", height: "100%"}}>
                <ul style={{listStyle: "none", padding: "0"}}>
                    <li style={{display: "flex", alignItems: "center", color: "white", height: "32px", margin: "6px 0", padding: "0 6px", borderRadius: "3px"}}>Features</li>
                    <li style={{display: "flex", alignItems: "center", color: "white", height: "32px", margin: "6px 0", padding: "0 6px"}}>Audiences</li>
                    <li style={{display: "flex", alignItems: "center", color: "white", height: "32px", margin: "6px 0", padding: "0 6px"}}>Events</li>
                </ul>
            </div>
        </div>
    )
}