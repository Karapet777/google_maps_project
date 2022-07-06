import React, {useCallback, useState} from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../../redux/restaurantsSlice";
import style from "./Comments.module.css";

const Comments = ({ comments, id }) => {
   const dispatch = useDispatch();

   const [, updateState] = useState();
   const forceUpdate = useCallback(() => updateState({}), []);
   const [commentText, setCommentText] = useState('');

   const changeCommentHandler = e => {
      setCommentText(e.target.value);
   };

   const addComment = () => {
      dispatch(createComment({id: Number(id),comment:commentText}));
      setCommentText('')
      forceUpdate()
   }

   return (
      <div className={style.container}>
         <div className={style.blockListComments}>
            <p className={style.title}>Commets</p>
            {comments?.map(item => (
               <div className={style.listItem} key={item.id}>
                  <p>{item.date}</p>
                  <p>{item.comment}</p>
               </div>
            ))}
         </div>
         <div className={style.blockInput}>
            <input
               placeholder="Leave a comment"
               className={style.input}
               value={commentText}
               type="text"
               onChange={e => changeCommentHandler(e)}
            />
            <button
               onClick={() => addComment()}
               className={style.btnAddComment}
            >
               Add comments
            </button>
         </div>
      </div>
   );
};

export default Comments;
