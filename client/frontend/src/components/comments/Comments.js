import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./api";


const Comments = ({ commentsUrl, currentUserId,id,user }) => {

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null,
    
    );
    var user_p=JSON.parse(localStorage.getItem("user"))
var userId=user_p._id
var username=user_p.username

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
   

    createCommentApi(id,userId,username,text, parentId)
      getCommentsApi(id).then((data) => {
        setBackendComments(data);
    });
    window.location.reload(false);
  };


  const updateComment = (text, commentId) => {

    updateCommentApi(text,commentId,userId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
      window.location.reload(false);
    });
  };
  const deleteComment = (commentId,PostId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer le commentaire?")) {
      deleteCommentApi(commentId,PostId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
      window.location.reload(false);
    }
  };

  useEffect(() => {
    getCommentsApi(id).then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
   
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
         
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
