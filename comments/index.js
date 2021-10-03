const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
    res.send(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    comments = commentsByPostId[req.params.postId] || [];
    comments.push({ id, content });
    commentsByPostId[req.params.postId] = comments;
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Comments listening on 4001');
})