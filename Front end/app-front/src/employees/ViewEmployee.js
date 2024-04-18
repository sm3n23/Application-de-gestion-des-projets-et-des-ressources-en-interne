import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewEmployee() {
  let navigate = useNavigate();

  const{id} = useParams()

  const [employee, setEmployee] = useState({
    name: "",
  });

  useEffect(()=>{
    loadEmployee();
  },[])
  

  

  const loadEmployee = async () => {
    
    const result= await axios.get(`http://localhost:8085/projects/${id}`);
    setEmployee(result.data)
    console.log(result.data)
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Employee Details</h2>
          
            <div className="mb-3">
              <label  className="from-label px-5">
                Name:
              </label>
              <b>{employee.name}</b>
                
              
              
            </div>
            <Link className="btn btn-outline-primary" to="/">
              Home
            </Link>
          
        </div>
      </div>
    </div>
  );
}
