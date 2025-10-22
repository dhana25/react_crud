import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Employeeview = () => {
    const {id} = useParams();
    const [empdata,empchange] = useState({});
    const navigate = useNavigate();

    const back = () => {
        navigate('/')
    }

    useEffect(() => {
         fetch('http://localhost:8000/employees/' + id).then((rep) => {
            return rep.json()
         }).then((data) => {
            empchange(data)
         }).catch((err) => {
            console.log(err.message)
         })   
    },[])
    return (
        <div>
            <div className="container" style={{textAlign:'left'}}>
                <div className="card">
                    <div className="card-title">
                        <h3 className="text-center mt-2">Employee Data</h3>
                    </div>
                    <div className="card-body">
                        <h2>Employee Name : {empdata.name}</h2>
                        <h3>Employee email id : {empdata.email}</h3>
                        <h4>Employee mobile number : {empdata.mobile}</h4>
                        <h5>Employee working : {empdata.active? 'Active' : 'Inactive'}</h5>
                        <button className="btn btn-danger" onClick={() => back()}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employeeview;