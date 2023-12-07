module.exports = function ({ app, dbConn, upload }) {
    //CREATE
    app.post('/comments', (req, res) => {
        const parentId = req.body.parent_id;
        const userId = req.body.user_id;
        const commentContent = req.body.comment_content;
        const hasPost = req.body.has_post;
    
        const createCommentSql = 'INSERT INTO comment (parent_id, user_id, comment_content, has_post) VALUES (?, ?, ?, ?)';
        dbConn.query(createCommentSql, [parentId, userId, commentContent, hasPost], function (error, comment) {
          if (error) {
            console.error(error);
            res.status(500).jsonp({ error: 'Erro ao criar o comentário.' });
          } else {
            res.status(200).jsonp({ 
                comment: {
                    id: comment.id,
                    parentId: comment.parent_id,
                    userId: comment.user_id,
                    commentContent: comment.comment_content,
                    hasPost: comment.has_post
                },
                message: 'Comentário criado com sucesso.' 
            });
          }
        });
    });

    //READ
    app.get('/posts/:postId/:hasPost/comments', (req, res) => {
        const postId = req.params.postId;
        const hasPost = req.params.hasPost; 
        const getCommentsSql = 'SELECT * FROM `comment` WHERE has_post = ? AND parent_id = ? ORDER BY id ASC';
    
        dbConn.query(getCommentsSql, [hasPost, postId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).jsonp({ error: 'Erro ao buscar os comentÃ¡rios.' });
            return;
        }
    
        const comments = results.map(comment => ({
            id: comment.id,
            parentId: comment.parent_id,
            userId: comment.user_id,
            commentContent: comment.comment_content,
            hasPost: comment.has_post,
            deletedAt: comment.deleted_at
        }));
    
        res.status(200).jsonp(comments);
        });
    });

    //DELETE
    app.post('/comments/delete/:commentId', (req, res) => {
        const commentId = req.params.commentId;
        const deletedAt = new Date();
    
        const deleteCommentSql = 'UPDATE comment SET deleted_at = ? WHERE id = ?';
    
        dbConn.query(deleteCommentSql, [deletedAt, commentId], (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o comentário.' });
          } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Comentário não encontrado.' });
          } else {
            res.status(200).json({ message: 'Comentário excluído com sucesso.' });
          }
        });
      });
}