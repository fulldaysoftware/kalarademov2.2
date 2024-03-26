import Cookies from 'js-cookie';
import axios from "axios"

export default async function user_login(userData) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'credentials': 'include'
    },
    body: JSON.stringify(userData)
  };

  try {
    const response = await fetch('https://klara-backend.vercel.app/api/auth/signin', config);
    const responseData = await response.json();

    console.log("response all from logins", responseData);

    if (responseData.success) {
      
      
      if (responseData.data.isAdmin === true) {
        
        // console.log("works ", response.data.tenantId);
        return { isAdmin: true, response: true, data: responseData.data.places, regions: responseData.data.regions, ID:responseData.data.tenantId, user:responseData.data.user   };
      }
      return { isAdmin: false, response: true, data: responseData.data.places, user:responseData.data.user };
    }

    if (responseData.success === false) {
      return { isAdmin: false, response: false, data: "Wrong Credential" };
    }
  } catch (error) {
    return { isAdmin: false, response: "error", data: "Something is Wrong" };
  }
}

export async function saveFormMain(data) {
 console.log("to be saveddddddddddddddddddddd",data);
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('https://klara-backend.vercel.app/api/reviewAttributes/postReviewAttributes', config);
    const responseData = await response.json();
    console.log('Response:', responseData);
    
    return responseData.success

  } catch (error) {
    console.error('Error: ', error);
  }
}
export async function signOut() {
  try {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'credentials': 'include'
      }
    };

    const response = await fetch('https://klara-backend.vercel.ap/api/auth/signout', config);
    const responseData = await response.json();
    return responseData
    console.log('Logout Response:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}
export async function getForms(data) {
  const temp = {tenantId: data.tenantID}
  try {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(temp)
    };
    

    const response = await fetch('https://klara-backend.vercel.app/api/reviewAttributes/', config);
    const responseData = await response.json();
    if(responseData.success) {
      console.log("My reviewsssssssssssss", responseData);
      return responseData.data.reviewAttributes
    }
    console.log('Logout Response:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function getDetails(placeId, tenantID) {
  console.log(placeId); // Optional: Log placeId for debugging

  const url = `https://klara-backend.vercel.app/api/reviewAnalysis/analysis/detail/${placeId}`;

  const body = { tenantId: tenantID }; // Assuming tenantId is sent as JSON data

  try {
    const response = await fetch(url, {
      method: 'POST', // Ensure this matches the API endpoint expectation
      headers: { 'Content-Type': 'application/json' }, // Optional header for JSON body
      body: JSON.stringify(body), // Stringify object for request body
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const temp = await response.json();
    const data = temp.data


    const resultObject = {
      displayName: data.displayName,
      photo: data.photos,
      id: data.id,
      address: data.formattedAddress,
      editorialSummary: data.editorialSummary,
      averageRating: data.rating,
      graph: data.ratings,
      summary: data.summary,
      average: data.rating,
      detailSummary: data.classification,
      review_sentiments: data.review_sentiments,
      food_sentiments: data.food_sentiments,
      room_sentiments: data.room_sentiments,
      service_sentiments: data.service_sentiments,
    };
    return resultObject; // Return the processed data
  } catch (error) {
    console.error('Error fetching details:', error);
    // Handle errors appropriately, e.g., display error message to user
  }
}

export async function getClientReviewForm(reviewId) {
  const url = `https://klara-backend.vercel.app/api/reviews/${reviewId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching review: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error; // Re-throw the error for potential handling in the calling context
  }
}
