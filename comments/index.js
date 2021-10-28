const axios = require('axios');
const cors = require('cors');
const { randomBytes } = require('crypto');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

const onCatch = (err) => {
    console.log(err.message);
};

app.get('/posts/:postId/comments', (req, res) => {
    res.send(commentsByPostId[req.params.postId] || []);
});

app.post('/posts/:postId/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;

    comments = commentsByPostId[req.params.postId] || [];
    comments.push({ id, content, status: 'pending' });
    commentsByPostId[req.params.postId] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id,
            content,
            status: 'pending',
            postId: req.params.postId
        }
    }).catch(onCatch);

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Event received:', req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { id, content, status, postId } = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(x => x.id === id);
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: { id, content, status, postId }
        }).catch(onCatch);
    }

    res.send({});
});

app.listen(4001, () => {
    console.log('Comments listening on 4001');
});