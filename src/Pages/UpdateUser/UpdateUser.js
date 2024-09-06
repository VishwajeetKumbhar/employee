import React, { useEffect, useState } from 'react'
import "./Updateuser.css"
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
const UpdateUser = () => {

    const {id}= useParams();

    const navigate =  useNavigate();

    const [formData , setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
    })

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        })
    };

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/employee/${id}`)
                const data = await response.json();
                console.log(data)
                setFormData(data);
            } catch (error) {   
                console.log("Error in fetching single user" , error.message);
            }
        }
        fetchEmployee();

    }, [id])

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/employee/${id}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Update User" , data)

            navigate("/");
        } catch (error) {
                console.error("Error in updating user" , error.message);
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Edit Employee</h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handelInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handelInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="phone" placeholder="Enter Phone" value={formData.phone} onChange={handelInputChange} />
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Control type="text" name="department" placeholder="Enter Department" value={formData.department} onChange={handelInputChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                        Update Employee
                    </Button>
                </Form>
            </div>
        </>

    )
}

export default UpdateUser