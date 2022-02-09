import React, { Component } from "react"
import { Row, Col, Image } from "react-bootstrap"
import "./styles.css"

interface Props {
  name: string
  avatar: string
}

export default function BlogAuthor({ name, avatar }: Props) {
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
