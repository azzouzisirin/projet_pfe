import { useState } from "react";
import {  CancelPresentationOutlined ,Send} from "@material-ui/icons";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [body, setbody] = useState(initialText);
  const isTextareaDisabled = body.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(body);
    setbody("");

  };
  return (
    <form onSubmit={onSubmit}>
      <div style={{display: "flex"}}> 
      <textarea style={{display: "flex"}}
        className="comment-form-textarea"
        value={body}
        onChange={(e) => setbody(e.target.value)}
      />
      <button style={{display: "flex"}} className="comment-form-button" disabled={isTextareaDisabled}>
       <Send/>
      </button>
     
   
      {hasCancelButton && ( 
        <button
          type="button"
          className="comment-form-button"
          onClick={handleCancel}
        >
          <CancelPresentationOutlined />
        </button>
      )}
       </div>
    </form>
  );
};

export default CommentForm;
