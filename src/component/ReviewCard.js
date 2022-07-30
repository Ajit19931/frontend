import React from 'react';
// import ReactStars from 'react-rating-stars-component';
import { Rating } from '@material-ui/lab';

const ReviewCard = ({ reviw }) => {
  const options = {
    // edit: false,
    // color: "#eee",
    // activeColor: "#ffab10",
    // size: window.innerWidth < 600 ? 19 : 21,
    value: reviw.rating,
    size: "small",
    readOnly: true,
    precision:0.5,

  }
  return (
    <li key="{reviw}" className="review-item">
      <div className="review-media">
        <span className="review-avatar" to="/">
          <img src='../Profile.png' alt="review" /></span>
        <h5 className="review-meta"><b to="/">{reviw.name}</b><span>June 02, 2020</span></h5>
      </div>
      <Rating {...options} />
      <p className="review-desc">{reviw.comment}</p>

    </li>
  )
}

export default ReviewCard