import Post from '../models/post_model';

// this cleans the posts because we use id instead of dangling _id
// and we purposefully don't return content here either
const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
  .then(posts => {
    res.json(cleanPosts(posts));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    res.json({ title: post.title, tags: post.tags, content: post.content });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    post.remove()
    .then(() => {
      res.json({ message: 'Post removed!' });
    })
    .catch(error => {
      res.json({ error });
    });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  if (req.body.title !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ title: req.body.title })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.tags !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ tags: req.body.tags })
    .catch(error => {
      res.json({ error });
    });
  }
  if (req.body.content !== '') {
    Post.find().where({ _id: req.params.id })
    .update({ content: req.body.content })
    .catch(error => {
      res.json({ error });
    });
  }
  Post.findById(req.params.id)
  .then(post => {
    res.json(post);
  })
  .catch(error => {
    res.json({ error });
  });
};
