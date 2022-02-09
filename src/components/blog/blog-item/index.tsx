import React, { Component } from "react"
import { Card } from "react-bootstrap"
import BlogAuthor from "../blog-author"
import { Link } from "react-router-dom"
import "./styles.css"

interface Props {
  title: string
  cover: string
  author: string
  id: string
}

export default function BlogItem({ title, cover, author, id }: Props) {

    return (
      <Link to={`/blog/${id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <BlogAuthor {...author} />
          </Card.Footer>
        </Card>
      </Link>
    )
}
