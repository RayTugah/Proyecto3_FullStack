import axios from "axios";

const BASE_URL = "http://localhost:3000/api/reviews";

export const getReviewsByGame = (gameId) =>
  axios.get(`${BASE_URL}/${gameId}`);

export const createReview = (gameId, reviewData, token) =>
  axios.post(`${BASE_URL}/${gameId}`, reviewData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteReview = (reviewId, token) =>
  axios.delete(`${BASE_URL}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });