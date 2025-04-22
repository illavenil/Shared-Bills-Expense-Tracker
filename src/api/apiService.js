import axios from "axios";
import { toast } from "react-toastify";

const { baseUrl, baseUrl2 } = require("../config");
// const baseUrl = 'http://localhost:8093'
// const baseUrl = 'http://127.0.0.1:8093'
// const baseUrl2 = 'http://127.0.0.1:5000'
var Headers = { "Content-Type": "application/json" };
const Internal_Server_Error = {
  message: "Unable to make API calls",
  status: 500,
};
const errorCodes = [400, 402, 404, 500];

/* export async function axiosGet(uri) {
    const finalURL = baseUrl + uri;
    console.log("Making GET API call to : " + finalURL);

    axios(finalURL, {
        method: 'GET',
        mode: 'no-cors',
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
} */

export async function getAPICall(uri, path) {
  let finalURL;
  try {
    if (path === 2) {
      finalURL = baseUrl2 + uri;
    } else {
      finalURL = baseUrl + uri;
    }
    console.log("Making GET API call to : " + finalURL);

    const res = await fetch(finalURL, {
      method: "GET",
      headers: {
        //   'Authorization': jwtTokeArray[1],
        "Content-Type": "application/json", // Adjust the content type as needed
        // Add other custom headers as needed
      },
    });
    const data = await res.json();
    console.log("data", data);
    console.log("status", res.status); // Access the status code here
    if (errorCodes.includes(res.status)) {
      console.log("Internal error occured");
      toast.error("Internal error occured");
      return null;
    } else if (res.status === 401) {
      console.log("into this");
      toast.error("Error: " + data.message);
      // toast.error("401 error message comes soon")
      return null;
    } else if (res.status === 200) {
      return data;
    } else {
      toast.error("Check later ");
      return null;
    }
    // return { data: data, status: res.status }
  } catch (error) {
    console.log("Error occurred in making POST api call : " + error);
    toast.error("Internal error occured");
    return { message: "Unable to make API calls", status: 500 };
  }
}

export async function postAPICall(uri, body, path) {
  let finalURL;
  if (path === 2) {
    finalURL = baseUrl2 + uri;
  } else {
    finalURL = baseUrl + uri;
  }
  try {
    console.log("Making POST API call to : " + finalURL);
    const response = await fetch(finalURL, {
      method: "POST",
      headers: {
        // 'Authorization': jwtTokeArray[1],
        "Content-Type": "application/json", // Adjust the content type as needed
      },
      body: JSON.stringify(body),
    });
    const jsonResponse = await response.json();
    if (errorCodes.includes(response.status)) {
      console.log("error");
      console.log(jsonResponse.message);
      toast.error("Error: " + jsonResponse.message);
      return null;
    } else if (response.status === 401) {
      console.log(jsonResponse);
      console.log(jsonResponse.message);
      toast.error(jsonResponse.message);
      return null;
    } else if (response.status === 200) {
      return jsonResponse;
    } else {
      toast.error("Check after some time");
      return null;
    }
  } catch (error) {
    console.log("Error occurred in making POST api call : " + error);
    toast.error("Internal error occurred");
    return null;
  }
}

export async function postAPIpdfCall(body, uri) {
  let finalURL = baseUrl2 + uri;
  console.log("Making get API pdf call to : " + finalURL);
  try {
    // Send POST request using axios or fetch
    const response = await axios.post(finalURL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("File not supported");
    return null;
  }
}

export async function deleteAPICall(uri, body) {
  try {
    let finalURL = baseUrl + uri;
    console.log("Making Delete API call to : " + finalURL);
    var response;
    await fetch(finalURL, {
      method: "DELETE",
      headers: Headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        response = json;
      });

    // handle the common error here
    if (errorCodes.includes(response.status))
      // Toast(response.message, 'error');

      return response;
  } catch (error) {
    console.log("Error occurred in making DELETE api call : " + error);
    return Internal_Server_Error;
  }
}

export async function putAPICall(uri, body, path) {
  try {
    let finalURL;
    if (path === 2) {
      finalURL = baseUrl2 + uri;
    } else {
      finalURL = baseUrl + uri;
    }
    console.log("Making PUT API call to: " + finalURL);

    const response = await fetch(finalURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adjust the content type as needed
        // Add other custom headers as needed
      },
      body: JSON.stringify(body),
    });

    const jsonResponse = await response.json();

    if (errorCodes.includes(response.status)) {
      console.log("Error");
      console.log(jsonResponse.message);
      toast.error("Error: " + jsonResponse.message);
      return null;
    } else if (response.status === 401) {
      console.log(jsonResponse);
      toast.error(jsonResponse.message);
      return null;
    } else if (response.status === 200) {
      toast.success(jsonResponse.message);
      return jsonResponse;
    } else {
      toast.error("Check after some time");
      return null;
    }
  } catch (error) {
    console.log("Error occurred in making PUT API call: " + error);
    toast.error("Internal error occurred");
    return null;
  }
}

const exportedFunctions = {
  getAPICall,
  postAPICall,
  deleteAPICall,
  putAPICall,
};

export default exportedFunctions;
