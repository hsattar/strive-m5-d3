export interface IBlog {
    id:        string
    category:  string
    title:     string
    cover:     string
    readTime:  ReadTime
    author:    Author
    content:   string
    comments:  Comment[]
    createdAt: Date
    updatedAt: Date
}

export interface Author {
    name:   string
    avatar: string
}

export interface Comment {
    author: string
    text:   string
}

export interface ReadTime {
    value: number
    unit:  string
}
