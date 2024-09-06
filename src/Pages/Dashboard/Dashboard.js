import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employees")
        const data = await response.json();

        setEmployees(data);
      } catch (error) {
        console.log("Error Fetching Employess", error.message);

      }
    }

    fetchEmployees();
  }, [])

  const handleDelete = async(employeeId)=>{
    try {
      const response = await fetch(`http://localhost:8080/employee/${employeeId}`,{
        method:"DELETE",
      });
      if(response.ok){
        setEmployees((prevEmployees)=>{
          prevEmployees.filter((employee)=>employee.id !== employeeId)
        })
      }
      console.log("Employee Delete Sucessfully")
    } catch (error) {
      console.log("Error Deleteing Employee" , error.message)
    }
  }

  const handleUpdate = (employeeId)=>{
    navigate(`/employee/${employeeId}`)
  }

  return (
    <>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h1 className='text-center'>Employees</h1>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => {
                  return (
                    <tr key={employee.id}>
                      <td> {employee.name} </td>
                      <td> {employee.email} </td>
                      <td> {employee.phone} </td>
                      <td> {employee.department} </td>
                      <td>
                        <Button variant='outline-secondary' className='mx-2' onClick={()=>handleUpdate(employee.id)} >Update</Button>
                        <Button variant='outline-danger' onClick={()=>handleDelete(employee.id)} >Delete</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard