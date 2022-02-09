
interface Props {
    data: {
        author: string
        text: string
    }
}

export default function BlogComments({ data }: Props) {
    return (
        <p>{data.author} - {data.text}</p>
    )
}