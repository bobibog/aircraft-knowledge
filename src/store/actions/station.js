import axios from "../../axios-azure";
import axiosPrivate from "../../axios-private";

export function addStation({
  stationId,
  latitude,
  longitude,
  city,
  country,
  locationAddress,
  feederName,
  feederEmail,
  feederPhone,
  description,
  isAuthenticated,
  history,
}) {
  return function (dispatch) {
    const url = "/Station";

    const stationData = {
      stationId,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      city: city || "",
      country: country || "",
      locationAddress: locationAddress || "",
      feederName: feederName || "",
      feederEmail: feederEmail || "",
      feederPhone: feederPhone || "",
      description: description || "",
    };

    const config = {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },
    };

    return axios
      .post(url, stationData, config)
      .then((response) => {
        console.log("Success response:", response);
        alert("Station was added successfully.");
      })
      .catch((error) => {
        console.error("Error response:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
          const errorMessages = error.response.data.errors
            ? Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                .join("\n")
            : error.response.data.title || "Unknown error occurred.";
          alert(`Error: ${errorMessages}\nStatus: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request data:", error.request);
          alert(
            "No response received from the server. Please check your network connection and try again."
          );
        } else {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
        console.error("Error config:", error.config);
      });
  };
}

export function updateStation(stationData) {
  return function (dispatch) {
    const url = `/Station/${stationData.id}`;

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${isAuthenticated}`,
    //     "Content-Type": "application/json",
    //     accept: "*/*",
    //   },
    // };

    return axiosPrivate
      .put(url, stationData)
      // .then((response) => {
      //   console.log("Success response:", response);
      //   alert("Station was updated successfully.");
      // })
      // .catch((error) => {
      //   console.error("Error response:", error);
      //   if (error.response) {
      //     console.error("Error data:", error.response.data);
      //     const errorMessages = error.response.data.errors
      //       ? Object.entries(error.response.data.errors)
      //           .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
      //           .join("\n")
      //       : error.response.data.title || "Unknown error occurred.";
      //     alert(`Error: ${errorMessages}\nStatus: ${error.response.status}`);
      //   } else if (error.request) {
      //     console.error("Request error:", error.request);
      //     alert(
      //       "No response received from the server. Please check your network connection and try again."
      //     );
      //   } else {
      //     console.error("Error message:", error.message);
      //     alert(`Error: ${error.message}`);
      //   }
      //   console.error("Error config:", error.config);
      // })
      ;
  };
}

// export function updateStation({
//   id,
//   latitude,
//   longitude,
//   city,
//   country,
//   locationAddress,
//   feederName,
//   feederEmail,
//   feederPhone,
//   description,
//   feederNotificationEmail,
//   isAuthenticated,
//   history,
// }) {
//   return function (dispatch) {
//     const url = `/Station/${id}`;

//     const stationData = {
//       id,
//       latitude: parseFloat(latitude),
//       longitude: parseFloat(longitude),
//       city: city || null,
//       country: country || null,
//       locationAddress: locationAddress || null,
//       feederName: feederName || "",
//       feederEmail: feederEmail || "",
//       feederPhone: feederPhone || null,
//       description: description || null,
//       feederNotificationEmail: feederNotificationEmail || null,
//     };

//     const config = {
//       headers: {
//         Authorization: `Bearer ${isAuthenticated}`,
//         "Content-Type": "application/json",
//         accept: "*/*",
//       },
//     };

//     return axios
//       .put(url, stationData, config)
//       .then((response) => {
//         console.log("Success response:", response);
//         alert("Station was updated successfully.");
//       })
//       .catch((error) => {
//         console.error("Error response:", error);
//         if (error.response) {
//           console.error("Error data:", error.response.data);
//           const errorMessages = error.response.data.errors
//             ? Object.entries(error.response.data.errors)
//                 .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
//                 .join("\n")
//             : error.response.data.title || "Unknown error occurred.";
//           alert(`Error: ${errorMessages}\nStatus: ${error.response.status}`);
//         } else if (error.request) {
//           console.error("Request error:", error.request);
//           alert(
//             "No response received from the server. Please check your network connection and try again."
//           );
//         } else {
//           console.error("Error message:", error.message);
//           alert(`Error: ${error.message}`);
//         }
//         console.error("Error config:", error.config);
//       });
//   };
// }

export function fetchStation(id, isAuthenticated) {
  return function (dispatch) {
    const url = `/Station/${id}`;

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${isAuthenticated}`,
    //   },
    // };

    return axiosPrivate
      // .get(url, config)
      .get(url)
      .then((response) => {
        console.log("Fetched station data:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching station data:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          const errorMessages = error.response.data.errors
            ? Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
                .join("\n")
            : error.response.data.title || "Unknown error occurred.";
          alert(`Error: ${errorMessages}\nStatus: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request data:", error.request);
          alert(
            "No response received from the server. Please check your network connection and try again."
          );
        } else {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
      });
  };
}
