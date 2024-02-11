<template>
    <h2 class="mb-5">
        Comments
    </h2>
    <ul class="comments">
        <li v-for="comment in comments" :key="comment.id" :id="'comment-'+comment.id">
            <div class="bg-white rounded-md mb-5 p-5">
                <Comment :comment="comment" v-on:replyFor="replyFor" v-on:edit="edit"></Comment>
            </div>
            <div v-if="comment.childs">
                <ul class="child ml-14">
                    <li v-for="child in comment.childs" :key="child.id">
                        <div class="bg-white rounded-md mb-5 p-5">
                            <Comment :comment="child" v-on:replyFor="replyFor" v-on:edit="edit"></Comment>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
    <CommentForm ref="commentForm" v-on:submitForm="submitForm"></CommentForm>
</template>

<script setup>
    const comments = ref([]);
    const childs = ref([]);
    const commentForm = ref(null);

    const likes = [
        7,6,9,11,1,26
    ]
    
    comments.value = (await useJsonP('comments')).slice(0, 2);
    childs.value =  (await useJsonP('comments')).slice(2, 4);
    
    childs.value = childs.value.map((child) => {
        child.date = '1 months ago';
        child.liked = likes[child.id];
        child.username = 'user';
        return child;
    });

    comments.value = comments.value.map((comment, i) => {
        if (i == 1) {
            comment.username = 'admin';
            comment.body += ' <span class="mention">@mention</span>'
        } else {
            comment.username = 'user';
        }
        comment.date = '2 months ago';
        comment.liked = likes[comment.id];
        return comment;
    });

    comments.value[1].childs = childs.value;

    const submitForm = (content) => {
        comments.value.push({
            id: comments.value.length + 1,
            username: 'admin',
            email: 'admin@example.com',
            body: content,
            date: 'Just now',
            liked: 0
        });
    }

    const replyFor = (comment) => {
        window.scrollTo({
            top: document.getElementById("comment-form").offsetTop,
            behavior: "smooth"
        });
        commentForm.value.updateContent("@" + comment.username + " ");
    }

    const edit = (comment) => {
        commentForm.value.updateContent(comment.body);
    }
</script>

<style lang="scss">
    .comments {
        li {
            .child {
                position: relative;
                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -20px;
                    width: 2px;
                    height: 100%;
                    background-color: #e2e8f0;
                }
            }
        }
    }
</style>