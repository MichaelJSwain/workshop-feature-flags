import { Link } from "react-router-dom";
import "./SidebarNav.css";

export const SidebarNav = () => {
    return (
        <div className="sidebar-nav">
            <div className="sidebar-logo">
                <h3>Workshop</h3>
            </div>
            <div className="sidebar-links">
                <ul>
                    <Link to="/flags"><li>Features</li></Link>
                    <Link to="/audiences"><li>Audiences</li></Link>
                    <Link to="/events"><li>Events</li></Link>
                </ul>
            </div>
        </div>
    )
}