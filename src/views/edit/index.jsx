import React, { useState, useEffect } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import striptags from "striptags"
import "./styles.css"

const EditBlogPost = () => {

  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('https://picsum.photos/200/300')
  const [authorName, setAuthorName] = useState('')
  const [category, setCategory] = useState('Action')
  const [content, setContent] = useState('')

  const navigate = useNavigate()
  const { blogId } = useParams()

  const handleSubmit = async e => {
    e.preventDefault()
    const newPost = {
      category,
      title,
      cover,
      author: {
          name: authorName,
        },
      content: striptags(content)
    }
    try {
      const response = await fetch(`http://127.0.0.1:3001/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        navigate('/')
      } else {
        console.error('fetch failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchBlogDetails = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:3001/blogs/${blogId}`)
        if (response.ok) {
          const data = await response.json()
          setTitle(data.title)
          setCover(data.cover)
          setAuthorName(data.author.name)
          setCategory(data.category)
          setContent(data.content)
        } else if (response.status === 404) {
          navigate('/404')
        } else {  
          console.log('Fetch Failed')
        }
      } catch (error) {
        console.error(error)
      }
  }

  useEffect(() => {
    fetchBlogDetails()
  }, [])

    return (
      <Container className="new-blog-container">
        <Form className="mt-5" onSubmit={handleSubmit}>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" 
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Cover Image</Form.Label>
            <Form.Control size="lg" placeholder="Cover Image"  
              value={cover}
              onChange={e => setCover(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control size="lg" placeholder="Author Name"  
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" 
              value={category}
              onChange={e => setCategory(e.target.value)}
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
              value={content}
              onChange={(html) => setContent(html)}
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
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>

        </Form>
      </Container>
    )
}

export default EditBlogPost