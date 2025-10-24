import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [uname, unamechange] = useState('')
    const [pwd, pwdchange] = useState('')

    // useEffect(() => {
    //     if(sessionStorage.getItem('uname')){
    //          sessionStorage.clear()
    //     }
    // },[])

    const navigate = useNavigate();

    const handleLogin = (e) => {
        const logObj = { uname, pwd }
        e.preventDefault()
        if (validd()) {
            fetch('http://localhost:8000/register/' + uname).then((repp) => {
                //console.log(repp)
                if (repp.ok) {
                    return repp.json()
                } else {
                    throw new Error()
                }
            }).then((rep) => {

                if (Object.keys(rep).length == 0) {
                    toast.error("Please enter valid uname")
                } else {
                    if (rep.pwd === pwd) {
                        toast.success("Logged success");
                        navigate('/')
                        sessionStorage.setItem('uname',uname)
                    } else {
                        toast.error("Please enter valid pwd")
                    }
                }



            }).catch((err) => {
                toast.error('Invalid uname or pwd' + err.message)
            })
        }
    }

    const validd = () => {
        let preceed = true;

        if (uname === null || uname === '') {
            preceed = false
            toast.warning('Please enter the username')
        }

        if (pwd === null || pwd === '') {
            preceed = false
            toast.warning('Please enter the password')
        }

        return preceed;
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleLogin}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Login Form</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>User Name <span className="errmsg">*</span></label>
                                <input type="text" value={uname} onChange={(e) => unamechange(e.target.value)} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password<span className="errmsg">*</span></label>
                                <input type="password" value={pwd} onChange={(e) => pwdchange(e.target.value)} className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <ToastContainer transition={Flip} limit={5}></ToastContainer>
                            <button type="submit" className="btn btn-primary">Login</button>  |
                            <Link to={'/register'} className="btn btn-info">Not User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;