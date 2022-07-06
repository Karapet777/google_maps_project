import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from "./InfoPage.module.css";
import {
   calcRating,
   createRating,
   getRestaurant,
   selectCurrentRestaurant,
   selectRestaurants,
   getCurrentRestaurant, createRatingFetch
} from "../../redux/restaurantsSlice";
import Comments from "./elements/comments/Comments";
import StarRatings from "react-star-ratings";

const InfoPage = () => {
   const dispatch = useDispatch();
   const currentRestaurant = useSelector(selectCurrentRestaurant);
   const allRestaurant = useSelector(selectRestaurants);

   const location = useLocation();
   const id = location.pathname.replace("/", "");

   useEffect(() => {
      dispatch(getCurrentRestaurant(id));
   }, [dispatch,id]);

   const changeRating = newRating => {
      dispatch(createRatingFetch({restaurantId: Number(id), value:newRating}));
   };

   const text = "< Back to maps";

   return (
      <div className={style.container}>
         <div className={style.blockBtn}>
            <Link to="/" className={style.toBackBtn}>
               {text}
            </Link>
         </div>
         <div className={style.blockInfo}>
            <div>
               <img
                  className={style.img}
                  src={currentRestaurant.image}
                  alt="img"
               />
               <p>{currentRestaurant.name}</p>
               <StarRatings
                  rating={currentRestaurant.rateCount}
                  starRatedColor="blue"
                  changeRating={changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="30px"
                  starSpacing="15px"
               />
            </div>
            <div className={style.blockComments}>
               <Comments comments={currentRestaurant.comments} id={id} />
            </div>
         </div>
      </div>
   );
};

export default InfoPage;
