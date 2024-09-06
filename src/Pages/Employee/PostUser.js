import { Button, Form } from "react-bootstrap"
import "./PostUser.css"

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const PostUser = () => {

    const [formData, setFormData] = useState({
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
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch("http://localhost:8080/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log("Employee Created" , data);
            navigate("/");
        } catch (error) {
            console.log("Error creating Employee" , error.message)
        }
    }

    return (
        <>
            <div className="center-form">
                <h1>Post new Employee</h1>
                <Form onSubmit={handleSubmit}>
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
                        Post Employee
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default PostUser