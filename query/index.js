const axios = require('axios');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const onCatch = (err) => {
    console.log(err.message);
};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    } else if (type === 'CommentCreated') {
        const { id, content, status, postId } = data;
        posts[postId].comments.push({ id, content, status });
    } else if (type === 'CommentUpdated') {
        const { id, content, status, postId } = data;
        const comment = posts[postId].comments.find(x => x.id == id);
        comment.content = content;
        comment.status = status;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvent(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Query listening on 4002');

    const res = await axios.get('http://event-bus-srv:4005/events').catch(onCatch);

    for (let event of res.data) {
        handleEvent(event.type, event.data);
    }

});