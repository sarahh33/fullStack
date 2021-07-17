var _ = require('lodash');

const dummy = (blogs) => {
    return Number(1)
}

const totallLikes = (blogs) =>{
    const calculator = (sum,item) =>{return sum+item}
    return blogs.length === 0
    ? 0
    :blogs.map(blog=>blog.likes).reduce(calculator,0)
}

const favoriteBlog = (blogs) => {
    var biggest = blogs[0]
    for (i=0 ; i< blogs.length; i++){
        if (blogs[i].likes>biggest.likes){
            biggest = blogs[i]
        }
    }
    return biggest
}

const mostBlogs = (blogs)=> {
    const reFormat = _.groupBy(blogs, 'author')
    const highest = Math.max(...Object.keys(reFormat).map(name=>reFormat[name].length))
    
    const author = Object.keys(reFormat).find(name => {
        if (reFormat[name].length === highest){
            return name
        }
    })
    
    return {author: author, blogs: highest}
}


const mostLike = blogs => {
    const reFormat = _.groupBy(blogs, 'author')
    const calculator = (sum,item) =>{return sum+item}
    const most = Math.max(...Object.keys(reFormat).map(name=>reFormat[name].map(blog=>blog.likes).reduce(calculator,0)))
    const author = Object.keys(reFormat).find(name => {
        if (reFormat[name].map(blog=>blog.likes).reduce(calculator,0) === most){
            return name
        }
    })
    
    return {author: author,likes: most}
}

module.exports = {dummy, totallLikes,favoriteBlog, mostBlogs, mostLike}