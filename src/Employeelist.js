import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employeelist = () => {
    const navigate = useNavigate()
    const view = (id) => {
            navigate('employee/view/'+id)
    }

    const edit = (id) => {
            navigate('employee/edit/'+id)
    }

    const del = (id) => {
           if(window.confirm('Do you want to delete?')){
             fetch('http://localhost:8000/employees/' +id,{
                method:'DELETE'
             }).then((rep) => {
                alert('Recored Deleted!!!')
                window.location.reload()
             }).catch((err) => {
                 console.log(err.message)
             })
           }
    }


    const [empdata,empdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/employees").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
            //console.log(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])
    return (
            <div className="container">
                <div className="card">
                    <div className="card-title">
                        <h4 className="pt-2">Employee List</h4>
                    </div>
                    <div className="card-body pt-2">
                         <Link to="employee/create" className="btn btn-success float-end mb-2">Add Employee(+)</Link>
                        <table className="table table-bordered table-striped ">
                            <thead className="text-light table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empdata && empdata.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        <td><a onClick={()=>view(item.id)} className="btn btn-primary">View</a> | <a onClick={() => edit(item.id)} className="btn btn-info">Edit</a> | <a onClick={()=> del(item.id)} className="btn btn-danger">Delete</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}

export default Employeelist;