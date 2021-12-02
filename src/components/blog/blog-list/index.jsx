import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import BlogItem from "../blog-item"
// import posts from "../../../data/posts.json"

const BlogList = () => {

    const [posts, setPosts] = useState([])

    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3001/blogs')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        } else {
          console.error('Fetch Failed')
        }
      } catch (error) {
        console.error(error)
      }
    }

    useEffect(() => {
      fetchBlogs()
    }, [])

    return (
      <Row>
        {posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post.title} {...post} />
          </Col>
        ))}
      </Row>
    )
}

export default BlogList
