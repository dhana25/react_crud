import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employeelist from './Employeelist';
import Employeecreate from './Employeecreate';
import Employeeedit from './Employeeedit';
import Employeeview from './Employeeview';
import Register from './Register';
import Login from './Login';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
       <h3 className='text-center mt-3'>React js crud Application</h3> 
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employeelist/>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
            <Route path="employee/create" element={<Employeecreate/>}></Route>
            <Route path="employee/edit/:id" element={<Employeeedit/>}></Route>
            <Route path="employee/view/:id" element={<Employeeview/>}></Route>
          </Routes>
          <ToastContainer></ToastContainer>
       </BrowserRouter> 
    </div>
  );
}

export default App;
