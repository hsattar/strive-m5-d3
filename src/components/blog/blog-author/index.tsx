import React from "react"
import { Row, Col, Image } from "react-bootstrap"
import { Author } from "../../../types/blogInterface"
import "./styles.css"

export default function BlogAuthor({ name, avatar }: Author) {
    return (
      <Row>
        <Col xs={2}>
          <Image className="blog-author" src={avatar} roundedCircle />
        </Col>
        <Col>
          <div>by</div>
          <h6>{name}</h6>
        </Col>
      </Row>
    )
}
