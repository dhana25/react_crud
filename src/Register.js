import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const [id, idchange] = useState('');
    const [uname, unamechange] = useState('');
    const [pwd, pwdchange] = useState('');
    const [fname, fnamechange] = useState('');
    const [email, emailchange] = useState('');
    const [phone, phonechange] = useState('');
    const [country, countrychange] = useState('');
    const [address, addresschange] = useState('');
    const [gender, genderchange] = useState('');
    const navigate = useNavigate();

    const isValid = () => {
        let isproceed = true;
        let errormsg = "Please enter the value in";

        if (id === null || id === '') {
            isproceed = false;
            errormsg += ' username'
        }

         if (pwd === null || pwd === '') {
            isproceed = false;
            errormsg += ' password'
        }

        if (fname === null || fname === '') {
            isproceed = false;
            errormsg += ' fullname'
        }

         if (email === null || email === '') {
            isproceed = false;
            errormsg += ' Email'
        }

         if (phone === null || phone === '') {
            isproceed = false;
            errormsg += ' phone'
        }

         if (country === null || country === '') {
            isproceed = false;
            errormsg += ' country'
        }

        if (!isproceed) {
            toast.warning(errormsg)
            return;
        }else{
            if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){

            }else{
                isproceed = false
                toast.warning("Enter valid Email")
            }
        }

        return isproceed
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const regObj = { id, pwd, fname, email, phone, country, address, gender }
        //console.log(regObj)
        if (isValid()) {
            fetch("http://localhost:8000/register", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj)
            }).then((rep) => {

                if (rep.ok) {
                    toast.success("Register successfully!!!", { theme: 'dark' });
                    navigate('/login')
                } else {
                    throw new Error()
                }

            }).catch((err) => {
                toast.error("Register failed please try again!!!", { theme: 'dark' })
            })
        }
    }
    return (
        <div className="offset-lg-3 col-lg-6 mt-4">
            <form className="container" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-header">
                        <h3>User Register</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">User Name <span className="errmsg">*</span></label>
                                    <input type="text" value={id} onChange={(e) => idchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Password <span className="errmsg">*</span></label>
                                    <input type="password" value={pwd} onChange={(e) => pwdchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Full Name <span className="errmsg">*</span></label>
                                    <input type="text" value={fname} onChange={(e) => fnamechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Email <span className="errmsg">*</span></label>
                                    <input type="email" value={email} onChange={(e) => emailchange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Phone <span className="errmsg">*</span></label>
                                    <input type="number" value={phone} onChange={(e) => phonechange(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Country <span className="errmsg">*</span></label>
                                    <select className="form-control" value={country} onChange={(e) => countrychange(e.target.value)}>
                                        <option value="">Select country</option>
                                        <option value="india">India</option>
                                        <option value="usa">USA</option>
                                        <option value="russia">Russia</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="form-label">Address <span className="errmsg">*</span></label>
                                    <textarea className="form-control" value={address} onChange={(e) => addresschange(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label>Gender</label><br></br>
                                    <input type="radio" checked={gender === 'male'} onChange={(e) => genderchange(e.target.value)} name="gender" className="app-check" value="male" />
                                    <label>Male</label>
                                    <input type="radio" checked={gender === 'female'} onChange={(e) => genderchange(e.target.value)} name="gender" className="app-check" value="female" />
                                    <label>Female</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <ToastContainer transition={Flip} limit={5}></ToastContainer>
                        <button type="submit" className="btn btn-success">Create</button> |
                        <Link to={"/login"} className="btn btn-danger">Cancel</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;