import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Customerlist = () => {
    const [customerdata, customerlist] = useState(null)
    const [haveadd, addaccess] = useState(false)
    const [haveedit, editaccess] = useState(false)
    const [haveview, viewaccess] = useState(false)
    const [havedelete, deleteaccess] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        loadcustomer()
        getUseraccess()
    }, [])

    const handleadd = () => {
        if (haveadd) {
            toast.success('Added successfully')
        } else {
            toast.warning('You are not having access to Add')
        }

    }

    const handleedit = () => {
        if (haveedit) {
            toast.success('Edited successfully')
        } else {
            toast.warning('You are not having access to Edit')
        }
    }

    const handleview = () => {
        if (haveview) {
            toast.success('View successfully')
        } else {
            toast.warning('You are not having access to View')
        }
    }

    const handledelete = () => {
         if (havedelete) {
            toast.success('Deleted successfully')
        } else {
            toast.warning('You are not having access to Delete')
        }
    }

    const getUseraccess = () => {
        const userrole = sessionStorage.getItem('urole') != null ? sessionStorage.getItem('urole').toString() : '';
        fetch('http://localhost:8000/roleaccess?role=' + userrole + '&menu=customer').then((rep) => {
            if (rep.ok) {
                return rep.json()
            }else{
                navigate('/home');
                toast.warning('You are not authorized to allow');
            }
        }).then((repp) => {
            if (repp.length > 0) {
                console.log(repp)
                let userObj = repp[0];
                viewaccess(true)
                addaccess(repp[0].haveadd)
                editaccess(repp[0].haveedit)
                deleteaccess(repp[0].havedelete)
            }else{
                 navigate('/home');
                toast.warning('You are not authorized to allow');
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const loadcustomer = () => {
        fetch('http://localhost:8000/customer').then((rep) => {
            if (rep.ok) {
                return rep.json()
            } else {
                throw new Error()
            }
        }).then((rep1) => {
            customerlist(rep1)
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Customer List
                        <button onClick={handleadd} className="btn btn-success" style={{ float: 'right' }}>Add(+)</button></h3>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {customerdata && customerdata.map((item) =>
                                <tr key={item.code}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td> <button onClick={handleview} className="btn btn-info">View</button> | <button onClick={handleedit} className="btn btn-warning">Edit</button> | <button onClick={handledelete} to={''} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer">

                </div>
            </div>
        </div>
    )
}

export default Customerlist;