import axios from "axios";


export const getComments = async (id) => {
  const res = await axios.get("http://localhost:8000/post/getcomment/"+id);

  return res.data
    
};
  

export const createComment = async (id,userId,username,body, parentId = null) => {
 await fetch("http://localhost:8000/post/newcomment/"+id, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      username,
      body,
      parentId,
    }),
  })
 
  return {

  };
};

export const updateComment = async (body,id,userId) => {

   await fetch("/post/updateComment/"+id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
     
      body,
    
    }), 
  })
  return {  };
};

function deleteinPost(commentid,PostId){
   
   fetch("/post/deletComment/"+commentid, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  
  })
}
export const deleteComment = async (commentid,PostId) => {
  deleteinPost(commentid,PostId)
await fetch("/post/deletPostComment/"+commentid, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      PostId,
    
    
    }),
  
  })
  
  return {};
};
