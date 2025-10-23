import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Employeecreate = () => {
    const [empid, empidchange] = useState(1);
    const [name, empnamechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [active, activechange] = useState(true);
    const [validate,valchange] = useState(false); 

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empobj = {name,email,mobile,active}
        //console.log(empobj)
        fetch('http://localhost:8000/employees',{
            method:'post',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empobj)
        }).then((rep) => {
            alert("created new record!!")
            navigate('/')
            console.log('Data Added!!!')
        }).catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="container">
                <div className="col-lg-6 offset-lg-3">
                    <div className="card" style={{ textAlign: "left" }}>
                        <div className="card-title">
                            <h4 className="text-center mt-3">Employee Creation</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlesubmit}>
                                <div className="form-group">
                                    <label>ID</label>
                                    <input type="text" disabled="disabled" value={empid} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" required className="form-control" onBlur={() => valchange(true)} value={name} onChange={(e) => empnamechange(e.target.value)}></input>
                                    {name.length == 0 && validate && <span className="text-danger">Please enter name</span>}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" required className="form-control" onBlur={() => valchange(true)} value={email} onChange={(e) => emailchange(e.target.value)}></input>
                                     {email.length == 0 && validate && <span className="text-danger">Please enter email</span>}
                                </div>
                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input type="text" className="form-control" required value={mobile} onChange={(e) => mobilechange(e.target.value)}></input>
                                     {mobile.length == 0 && validate && <span className="text-danger">Please enter mobile</span>}
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" checked={active} type="checkbox" onChange={(e) => activechange(e.target.checked)}></input>
                                    <label className="form-check-label">Active</label>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">Add</button>  |
                                    <Link to="/" className="btn btn-danger">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employeecreate;