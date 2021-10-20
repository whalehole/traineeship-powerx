import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth.state";

export default function UserPanel() {
    const auth = useAuth();

    const handleLogout = e => {
        e.preventDefault();
        auth.logout();
    }
    
    return auth.status !== "authenticated" ? 
    (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
    :
    (
        <div>
            <button onClick={handleLogout}>SIGN OUT</button>
        </div>
    )
}