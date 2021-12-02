import React, { useState } from "react"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import striptags from "striptags"
import "./styles.css"

const NewBlogPost = () => {

  const [title, setTitle] = useState('')
  const [cover, setCover] = useState(null)
  const [authorName, setAuthorName] = useState('')
  const [authorAvatar, setAuthorAvatar] = useState(null)
  const [category, setCategory] = useState('Action')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

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
      const response = await fetch('http://127.0.0.1:3001/blogs', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
        handleBlogCoverUploads(data)
      } else {
        console.error('POST failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleBlogCoverUploads = async data => {
    const formData = new FormData()
    formData.append('cover', cover)
    try {
      const response = await fetch(`http://127.0.0.1:3001/blogs/${data.id}/uploadCover`, {
        method: 'PATCH',
        body: formData
      })
      if (response.ok) {
        if (authorAvatar) {
          checkIfAvatarExists(data)
        } else {
          navigate('/')
        }
      } else {
        console.log('PATCH Failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfAvatarExists = async data => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/authors`)
      if (response.ok) {
        const authors = await response.json()
        const author = authors.find(author => data.author.name === `${author.name} ${author.surname}`)
        if (author) {
          handleAuthorAvatarUpload(author)
        } else {
          createNewAvatar(data)
        }
      } else {
        console.error('Fetch Failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const createNewAvatar = async data => {
    console.log(data)
    console.log(data.author)
    console.log(data.author.name)
    const names = data.author.name.split(' ')
    const name = names[0]
    const surname = names[1]
    const newAuthor = {
      name,
      surname,
    }
    try {
      const response = await fetch(`http://127.0.0.1:3001/authors/`, {
        method: 'POST',
        body: JSON.stringify(newAuthor),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const author = await response.json()
        handleAuthorAvatarUpload(author)
      } else {
        console.error('Creating user Failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAuthorAvatarUpload = async author => {
    const formData = new FormData()
    formData.append('avatar', authorAvatar)
    try {
      const response = await fetch(`http://127.0.0.1:3001/authors/${author.id}/uploadAvatar`, {
        method: 'PATCH',
        body: formData
      })
      if (response.ok) {
        navigate('/')
      } else {
        console.error('POST AVATR Failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

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
            <Form.Control type='file' size="lg"  
              onChange={e => setCover(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Name</Form.Label>
            <Form.Control size="lg" placeholder="Author Name"  
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Author Avatar (Optional)</Form.Label>
            <Form.Control type='file' size="lg"  
              onChange={e => setAuthorAvatar(e.target.files[0])}
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

export default NewBlogPost