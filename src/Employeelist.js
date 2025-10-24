import { useEffect, useState } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import { Flip, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employeelist = () => {
 const navigate = useNavigate()
   useEffect(() => {
    // Check if sessionStorage has user info (or token)
    const user = sessionStorage.getItem("uname");

    if (!user) {
      // No session data — redirect to login
      navigate("/login");
    }
  }, [navigate]);

    const handleLogout = () => {
    // ✅ Clear session storage only on logout
    sessionStorage.clear();
    navigate("/login");
  };

    const view = (id) => {
        navigate('employee/view/' + id)
    }

    const edit = (id) => {
        navigate('employee/edit/' + id)
    }

    const del = (id) => {
        if (window.confirm('Do you want to delete?')) {
            fetch('http://localhost:8000/employees/' + id, {
                method: 'DELETE'
            }).then((rep) => {
                alert('Recored Deleted!!!')
                window.location.reload()
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }
    const toasted = () => {

        toast("Notified")
        toast.info("Toast info")
        toast.success("Toast success")
        toast.warning("Toast warning")
        toast.error("Toast error")

        toast("Notified", { position: "top-left",theme:'colored' });
        toast.info("Toast info", { position: "top-left",theme:'colored' });
        toast.success("Toast success", { position: "top-left",theme:'colored' });
        toast.warning("Toast warning", { position: "top-left",theme:'colored' });
        toast.error("Toast error", { position: "top-left",theme:'colored' });

        toast("Notified", { position: "top-center",theme:'dark' });
        toast.info("Toast info", { position: "top-center",theme:'dark' });
        toast.success("Toast success", { position: "top-center",theme:'dark',autoClose:10000 });
        toast.warning("Toast warning", { position: "top-center",theme:'dark',autoClose:1000 });
        toast.error("Toast error", { position: "top-center",theme:'dark',autoClose:false });
    }


    const [empdata, empdatachange] = useState(null);

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
                     <button onClick={handleLogout}  className="btn btn-danger" style={{float:'right'}}>Logout</button>
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
                                    <td><a onClick={() => view(item.id)} className="btn btn-primary">View</a> | <a onClick={() => edit(item.id)} className="btn btn-info">Edit</a> | <a onClick={() => del(item.id)} className="btn btn-danger">Delete</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button onClick={toasted}>Notify!</button>
            <ToastContainer transition={Flip} limit={5}></ToastContainer>
        </div>
    )
}

export default Employeelist;