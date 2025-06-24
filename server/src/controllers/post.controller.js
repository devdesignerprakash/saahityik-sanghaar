import Post from "../models/post.model.js";
import PostType from "../models/postType.model.js";
export const createPost = async (req, res) => {
  console.log(req.body);
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can create post" });
    }
    const { title, postType, content, author, image } = req.body;
    const existPostType = await PostType.findOne({ postType });
    if (!existPostType) {
      return res.status(400).json({ error: "Invalid postType name" });
    }
    const newPost = await Post.create({
      title,
      postType: existPostType._id,
      content,
      author,
      image,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (allPosts.length > 0) {
      return res.status(200).json(allPosts);
    }
    return res.staus(400).json({ msg: "no post found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPublishedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    const filteredPost = allPosts.filter((post) => post.status == "published");
    res.status(200).json(filteredPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const published = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can published post" });
    }
    const { id } = req.params;
    const { status } = req.body;
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      res.status(400).json({ msg: "post not found" });
    }
    existPost.status = status;
    existPost.publishedAt = new Date();
    await existPost.save();
    res.status(200).json({ msg: "post published successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const editPost = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can edit post" });
    }
    const { id } = req.params;
    const { title, content, author, image, postType } = req.body;
    const existPost = await Post.findOne({ _id: id });
    const existPostType = await PostType.findOne(postType);
    if (!existPost) {
      res.status(400).json({ msg: "post not found" });
    }
    if (!existPostType) {
      res.status(400).json({ error: "invalid post type" });
    }
    const updatedPost = new Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        content,
        image,
        author,
        postType: existPostType._id,
      },
      { new: true }
    );
    res.status(200).json({ msg: "post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can edit post" });
    }
    const { id } = req.params;
    const existPost = await Post.findOne({ _id: id });
    if (!existPost) {
      res.status(400).json({ msg: "post not found" });
    }
    const deletedPost = new Post.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likes = async (req, res) => {
  try {
    const { postId } = req.params;
    const { id: userId } = req.user;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const alreadyLiked = post.likes.includes(postId);
    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    }
    post.likes.push(userId);
    post.save();
    res.status(200).json({ msg: "post liked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const comments = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { postId } = req.params;
    const { text } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({ msg: "Comment cannot be empty" });
    }
    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
    };
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment },
      },
      { new: true,runValidators:true},
    );
    if (!updatedPost) {
      res.status(400).json({ msg: "cannot add comment on post" });
    }
    res.status(200).json({ msg: "comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
