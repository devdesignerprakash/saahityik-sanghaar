import Post from "../models/post.model.js";
import PostType from "../models/postType.model.js";

// Create Post
export const createPost = async (req, res) => {
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
      imageUrl:req.imageUrl||null
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Posts
export const getPosts = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can create post" });
    }
    const allPosts = await Post.find();
    if (allPosts.length > 0) {
      return res.status(200).json(allPosts);
    }
    return res.status(400).json({ msg: "No post found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Published Posts
export const getPublishedPosts = async (req, res) => {
  try {
    const publishedPosts = await Post.find({ status: "published" });
    res.status(200).json(publishedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Publish Post
export const published = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can publish post" });
    }

    const { id } = req.params;
    const {status}=req.body

    const existPost = await Post.findById(id);
    if (!existPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    existPost.status = status;
    existPost.publishedAt = new Date();
    await existPost.save();

    res.status(200).json({ msg: "Post published successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Post
export const editPost = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can edit post" });
    }

    const { id } = req.params;
    const { title, content, author, image, postType } = req.body;

    const existPostType = await PostType.findOne({ postType });
    if (!existPostType) {
      return res.status(400).json({ error: "Invalid post type" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        image,
        author,
        postType: existPostType._id,
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({ msg: "Post updated successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete post" });
    }

    const { id } = req.params;

    const existPost = await Post.findById(id);
    if (!existPost) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    res.status(200).json({ msg: "Post deleted successfully", deletedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like / Unlike Post
export const likes = async (req, res) => {
  try {
    const { postId } = req.params;
    const { id: userId } = req.user;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (uid) => uid.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      msg: alreadyLiked ? "Post unliked" : "Post liked",
      totalLikes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Comment
export const comments = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { postId } = req.params;
    const {comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ msg: "Comment cannot be empty" });
    }

    const newComment = {
      user: userId,
      text:comment,
      createdAt: new Date(),
    };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment } },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(400).json({ msg: "Cannot add comment to post" });
    }

    res.status(200).json({ msg: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
