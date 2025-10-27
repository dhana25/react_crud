import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AppHeader = () => {
    const [displayusername, usernameupdate] = useState('');
    const [hideheader, headerValue] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
    
        sessionStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        let uname = sessionStorage.getItem('uname')

        if (location.pathname === '/login' || location.pathname === '/register') {
            headerValue(false)
        } else {
            headerValue(true)
            if (uname === '' || uname === null) {
                navigate('/login')
            } else {
                usernameupdate(uname)
            }
        }

    })
    return (
        <div>{hideheader &&
            <div className="header">
                <Link to={"/"} style={{ color: 'white', textDecoration: 'none' }}><b>Home</b></Link>
                <span style={{ marginLeft: '80%', color: 'white', fontWeight: 'bold' }}>Welcome : <b>{displayusername}</b></span>
                <Link to='' onClick={handleLogout} style={{ float: 'right', color: 'white', textDecoration: 'none' }}><b>Logout</b></Link>
            </div>
        }
        </div>
    )
}

export default AppHeader;