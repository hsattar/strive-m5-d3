import React, { FormEvent, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {

    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center w-50" style={{ minHeight: "100vh"}}>
            <Form onSubmit={handleSubmit} className="w-100 border p-4">
                <h2>Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" disabled={loading} className="w-100" type="submit">Login</Button>
                <Link to='/register' className="mt-3">Register</Link>
            </Form>
                <Button className='w-100 mt-3' onClick={handleGoogleLogin}>Login With Google</Button>
        </Container>
    )
}