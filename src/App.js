import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employeelist from './Employeelist';
import Employeecreate from './Employeecreate';
import Employeeedit from './Employeeedit';
import Employeeview from './Employeeview';


function App() {
  return (
    <div className="App">
       <h3>React js crud Application</h3> 
       <BrowserRouter>
          <Routes>
            <Route path='/' element={<Employeelist/>}></Route>
            <Route path="employee/create" element={<Employeecreate/>}></Route>
            <Route path="employee/edit/:id" element={<Employeeedit/>}></Route>
            <Route path="employee/view/:id" element={<Employeeview/>}></Route>
          </Routes>
       </BrowserRouter> 
    </div>
  );
}

export default App;
