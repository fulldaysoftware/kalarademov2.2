import React from 'react';
import './table.css'


function ReviewsTable({ reviewsArray }) {
    // const jsonObject = JSON.parse(reviewsArray)
    // console.log("tdata ",reviewsArray.reviews);
    const table = <table border="1">
            <thead>
                <tr>
                    <th>Author Name</th>
                    <th>Rating</th>
                    <th>Food</th>
                    <th>Service</th>
                    <th>Environment</th>
                </tr>
            </thead>
            <tbody>
                {reviewsArray && reviewsArray.reviews.map((review, index)=>(
                    <tr key={index}>
                        <td>{review.author_name}</td>
                    <td>{review.rating}</td>
                    <td>{review.FOOD}</td>
                    <td>{review.SERVICE}</td>
                    <td>{review.ENVIRONMENT}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    return (
        <>
            {reviewsArray && table}
        </>
    )
    }

export default ReviewsTable