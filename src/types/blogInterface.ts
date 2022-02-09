export interface IBlog {
    title:     string
    category:  string
    cover:     string
    author:    Author
    content:   string
}

export interface IBlogData extends IBlog {
    id:        string
    readTime:  ReadTime
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
