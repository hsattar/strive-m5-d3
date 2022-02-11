import React, { ChangeEvent, FormEvent, useState } from 'react'
import ReactQuill from 'react-quill'
import { Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IBlog } from '../../types/blogInterface'
import 'react-quill/dist/quill.snow.css'
import './styles.css'

export default function NewBlogPost() {

	const [blog, setBlog] = useState<IBlog>({
		title: '',
		category: '',
		cover: '',
		author: {
			name: '',
			avatar: ''
		},
		content: ''
	})

	const navigate = useNavigate()
  
	const handleSubmit = (e: FormEvent) => {
    	e.preventDefault()
  	}

  	const handleChange = (field: string, value: string) => {
		setBlog({
			...blog,
			[field]: value
		})
	}

	return (
		<Container className="new-blog-container">
			<Form className="mt-5" onSubmit={handleSubmit}>
				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						size="lg"
						placeholder="Title"
						value={blog.title}
						onChange={e => handleChange('title', e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Cover Image</Form.Label>
					<Form.Control
						type="file"
						size="lg"
						onChange={e => handleChange('cover', e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Author Name</Form.Label>
					<Form.Control
						size="lg"
						placeholder="Author Name"
						value={blog.author.name}
						onChange={e => handleChange('author.name', e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="blog-form" className="mt-3">
					<Form.Label>Author Avatar (Optional)</Form.Label>
					<Form.Control
						type="file"
						size="lg"
						onChange={e => handleChange('author.avatar', e.target.value)}
					/>
				</Form.Group>

				<Form.Group controlId="blog-category" className="mt-3">
					<Form.Label>Category</Form.Label>
					<Form.Control
						size="lg"
						as="select"
						value={blog.category}
						onChange={e => handleChange('category', e.target.value)}
					>
						<option>Action</option>
						<option>Comedy</option>
						<option>Horror</option>
						<option>Romance</option>
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="blog-content" className="mt-3">
					<Form.Label>Blog Content</Form.Label>
					<ReactQuill
						value={blog.content}
						onChange={html => handleChange('content', html)}
						className="new-blog-content"
					/>
				</Form.Group>

				<Form.Group className="d-flex mt-3 justify-content-end">
					<Button type="reset" size="lg" variant="outline-dark">
						Reset
					</Button>
					<Button
						type="submit"
						size="lg"
						variant="dark"
						style={{ marginLeft: '1em' }}
					>
						Submit
					</Button>
				</Form.Group>
			</Form>
		</Container>
	)
}
