// import { categoriesWidgetsHome } from '../config'
const MAXIMUM_POSTS = 10

const getPostsFromCategory = ({ post }, categoryId) =>

  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))

export const getPostsGroupedByCategory = (source, category) => {
  return Object.values(category)
    .reduce((acc, categoryId) => {
      const posts = getPostsFromCategory(source, categoryId).slice(0, MAXIMUM_POSTS)
      // console.log(posts)
      const category = source.category[categoryId]
      return [...acc, { posts, category }]
    }, [])
}