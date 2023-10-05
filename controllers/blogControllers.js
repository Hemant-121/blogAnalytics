const axios = require('axios');
const lodash = require('lodash');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const url = process.env.API;
const headers = {
      'x-hasura-admin-secret': process.env.SECRET_KEY,
};

const getBlogData = asyncHandler(async (req, res) => {
  try {

    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const blogData = response.data.blogs;

    const totalBlogs = blogData.length;

    const longestTitleBlog = lodash.maxBy(blogData, (blog) => blog.title.length);

    const blogsWithPrivacy = lodash.filter(blogData, (blog) =>
      blog.title.toLowerCase().includes('privacy')
    );

    const uniqueTitles = lodash.uniqBy(blogData, 'title');

    const statistics = {
      totalBlogs,
      longestTitle: longestTitleBlog ? longestTitleBlog.title : '',
      blogsWithPrivacy: blogsWithPrivacy.length,
      uniqueTitles: uniqueTitles.map((blog) => blog.title),
    };

    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch and process blog data at the moment' });
  }
});

const searchData = asyncHandler(async (req, res) => {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: 'Invalid query parameter.' });
  }
  try {   
    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const blogData = response.data.blogs;

    const searchResults = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch and process blog data at the moment' });
  }
});

module.exports = { getBlogData, searchData };
