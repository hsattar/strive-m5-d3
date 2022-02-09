import { Card } from "react-bootstrap"
import BlogAuthor from "../blog-author"
import { Link } from "react-router-dom"
import { IBlog } from "../../../types/blogInterface"
import "./styles.css"

export default function BlogItem({ title, cover, author, id }: IBlog) {

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
