import CommentForm from "./CommentForm";
const Comment = ({
  comment,
  replies,
  setActiveComment, 
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";
  const canDelete =
  Boolean(currentUserId);
  const canEdit = Boolean(currentUserId);
  const replyId =  Boolean(currentUserId);
	var user= JSON.parse(localStorage.getItem('user'))
function CrudComment (commentid,userId,PostId ){
  if(user._id===userId){
return(
  <div className="comment-actions">
        
  {canEdit && (
    <div
      className="comment-action"
      onClick={() =>
        setActiveComment({ id: commentid, type: "editing" })
        
      }
    >
      Modifier
    </div>
  )}
  {canDelete && (
    <div
      className="comment-action"
      onClick={() => deleteComment(commentid,PostId)}
    >
      Supprimer
    </div>
  )}
</div>)}
else return""
}
  return (
    <div key={comment._id} className="comment">
      <div className="comment-image-container">
     
<img src={comment.img}/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment._id,comment.userId)}
            handleCancel={() => {
              setActiveComment(null);
             
            }}
          />
        )}
       {CrudComment( comment._id,comment.userId,comment.PostId)}
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={null}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
