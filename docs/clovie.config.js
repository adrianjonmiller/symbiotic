export default {
  // 🗂️ Static site generation mode
  type: 'static',
  
  // 🎨 Template engine (Nunjucks is default)
  renderEngine: 'nunjucks',  // or 'handlebars', 'pug', 'eta'
  
  // Site metadata and global data
  data: {
    site: {
      title: 'docs',
      description: 'A fast static site built with Clovie',
      author: 'Your Name',
      url: 'https://your-domain.com'
    },
    nav: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' }
    ],
    buildDate: new Date().toISOString()
  },
  
  // 🚀 Ready for more? Uncomment these examples:
  
  // Load data from external source
  // data: async () => {
  //   const posts = await loadPostsFromMarkdown('./content/posts/');
  //   return {
  //     site: { title: 'docs', url: 'https://your-domain.com' },
  //     posts,
  //     categories: [...new Set(posts.map(p => p.category))]
  //   };
  // },
  
  // Generate pages from data
  // routes: [
  //   {
  //     name: 'Blog Posts',
  //     path: '/posts/:slug',
  //     template: 'post.html',
  //     repeat: (data) => data.posts,
  //     data: (globalData, post, key) => ({
  //       ...globalData,
  //       post,
  //       title: `${post.title} - ${globalData.site.title}`
  //     })
  //   },
  //   {
  //     name: 'Category Pages',
  //     path: '/category/:category',  
  //     template: 'category.html',
  //     repeat: (data) => data.categories,
  //     data: (globalData, category, key) => ({
  //       ...globalData,
  //       category,
  //       posts: globalData.posts.filter(p => p.category === category)
  //     })
  //   }
  // ],
  
  // Build optimizations
  // minify: true,
  // generateSitemap: true
};