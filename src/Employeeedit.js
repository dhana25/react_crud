import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Employeeedit = () => {
     const [empid, empidchange] = useState('');
    const [name, empnamechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [active, activechange] = useState(true);
    const [validate,valchange] = useState(false); 
    const {id} = useParams();

    useEffect(() => {
             fetch('http://localhost:8000/employees/' + id).then((rep) => {
                return rep.json()
             }).then((data) => {
                //empchange(data)
                empidchange(data.id)
                empnamechange(data.name)
                emailchange(data.email)
                mobilechange(data.mobile)
                activechange(data.active)
             }).catch((err) => {
                console.log(err.message)
             })   
        },[])

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empobj = {empid,name,email,mobile,active}
        //console.log(empobj)
        fetch('http://localhost:8000/employees/'+id,{
            method:'put',
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empobj)
        }).then((rep) => {
            alert("Updated new record!!")
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
                            <h4 className="text-center mt-3">Employee Edit</h4>
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
                                    <button type="submit" className="btn btn-success">Edit</button>  |
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

export default Employeeedit;