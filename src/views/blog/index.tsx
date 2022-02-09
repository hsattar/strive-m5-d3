import { useState, useEffect } from "react"
import { Container, Image, Modal, Button, Form } from "react-bootstrap"
import BlogAuthor from "../../components/blog/blog-author"
import BlogLike from "../../components/likes/BlogLike"
import BlogComments from '../../components/blog/blog-comment'
import { useParams, useNavigate } from 'react-router-dom'
import "./styles.css"

const Blog = () => {

  const { REACT_APP_BE_URL: BASE_URL } = process.env

  const { blogId } = useParams()
  const navigate = useNavigate()

  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(true)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [comment, setComment] = useState({
    author: '',
    text: ''
  })
  const [commentChanges, setCommentChanges] = useState(0)

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`)
      if (response.ok) {
        const data = await response.json()
        setBlog(data)
        setLoading(false)
      } else if (response.status === 404) {
        navigate('/404')
      } else {  
        console.log('Fetch Failed')

      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteBlog = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        navigate('/')
      } else {
        console.error('fetch failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddComment = async e => {
    e.preventDefault()
    try {
      const response = await fetch(`${BASE_URL}/blogs/${blogId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        setCommentChanges(count => count + 1)
        handleClose()
      } else {
        console.log('Posting Comment Failed')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [commentChanges])

  return (
    <div className="blog-details-root">
      {
        loading ? <p>Loading...</p> :
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <div className="d-flex justify-content-between my-5">
            <h1 className="blog-details-title my-0">{blog.title}</h1>
            <div className="d-flex">
              <button className="btn btn-success mr-3" onClick={() => navigate(`/blog/${blogId}/edit`)}>Edit</button>
              <button className="btn btn-danger ml-3" onClick={handleDeleteBlog}>Delete</button>
            </div>
          </div>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div style={{marginTop:20}}>
                <BlogLike defaultLikes={["123"]} onChange={console.log}/>
              </div>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>

        <div className="d-flex justify-content-between">
          <h6 className='mt-4'>Comments:</h6>
          <p className='mb-1' onClick={() => setShow(true)} >Add Comment</p>
        </div>
        
        { blog.comments.map((b, idx) => <BlogComments key={idx} data={b} /> ) }
        
        <a href={`${BASE_URL}/blogs/${blogId}/downloadPDF`}><i className="pdf-icon bi bi-file-earmark-pdf"></i></a>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={comment.author} onChange={e => setComment({...comment, author: e.target.value})}/>
          </Form.Group>

          <Form.Group>
            <Form.Label className="mt-2">Comment</Form.Label>
            <Form.Control type="text" placeholder="Comment" value={comment.text} onChange={e => setComment({...comment, text: e.target.value})}/>
          </Form.Group>
          <Button variant="success" type="submit" className="mt-3" onClick={handleAddComment}>
            Add
          </Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        </Container>
      }
      </div>
    )
    }
export default Blog
