import React from 'react'

const BlogForm = ({
    addBlog,
    handleTitle,
    handleAu,
    handleUrl,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h2>create new blog</h2>

            <form onSubmit={addBlog}>
                <div>title: <input
                    type='text'
                    value={title}
                    name='Title'
                    onChange={handleTitle}
                /></div>
                <div>author: <input
                    type='text'
                    value={author}
                    name='Author'
                    onChange={handleAu}
                /></div>
                <div>url: <input
                    type='url'
                    value={url}
                    name="Url"
                    onChange={handleUrl}
                /></div>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm