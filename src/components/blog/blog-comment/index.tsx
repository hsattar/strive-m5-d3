import React from "react"
import { Comment } from "../../../types/blogInterface"

interface Props {
    data: Comment
}

export default function BlogComments({ data }: Props) {
    return (
        <p>{data.author} - {data.text}</p>
    )
}