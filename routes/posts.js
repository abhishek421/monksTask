const router = require("express").Router();
let Post = require("../models/post.model");

router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete").delete((req, res) => {
  const postId = req.body.postId;
  Post.deleteOne({ _id: postId }).then((post) => res.json(`Post Deleted`));
});

router.route("/add").post((req, res) => {
  const post = req.body;
  const newPost = new Post(post);

  newPost
    .save()
    .then(() => res.json("Post added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.patch("/addPostData", async (req, res) => {
  try {
    const postData = req.body.post;
    const postUid = postData.post;
    
    let uniqueViews = [...new Set(postData.user_viewed_post)];
    
    let uniqueComments = [...new Set(postData.user_commented_post)];
    
    let uniqueShares = [...new Set(postData.user_shared_post)];
    
    const post = await Post.findOne({ _id: postUid })
    
    post.comments = uniqueComments;
    post.views = uniqueViews;
    post.shares = uniqueShares;

		await post.save()
		res.send(post)
	} 
	
	catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
});

router.patch("/setScore", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.post })
    
    comments = post.comments;
    views = post.comments;
    shares = post.shares;
    
    finalScore = .25*views+.5*comments+.25*shares;
    
    post.final_score = finalScore;
    
		await post.save()
		res.send(post)
	} 
	
	catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
});



module.exports = router;
