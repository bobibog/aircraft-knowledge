import axios from "../../axios-azure";

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
}) {
  return function (dispatch) {
    const url = "https://api-dev.aviolog.com/api/v1/Station";

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
        window.location.href = "/statistics";
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

export function updateStation({
  id,
  latitude,
  longitude,
  city,
  country,
  locationAddress,
  feederName,
  feederEmail,
  feederPhone,
  description,
  feederNotificationEmail,
  isAuthenticated,
}) {
  return function (dispatch) {
    const url = `https://api-dev.aviolog.com/api/v1/Station/${id}`;

    const stationData = {
      id, // Include the id explicitly as Swagger does
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      city: city || null,
      country: country || null,
      locationAddress: locationAddress || null,
      feederName: feederName || "",
      feederEmail: feederEmail || "",
      feederPhone: feederPhone || null,
      description: description || null,
      feederNotificationEmail: feederNotificationEmail || null,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
        "Content-Type": "application/json", // Ensure Content-Type is set
        accept: "*/*", // Match the accept header from Swagger
      },
    };

    return axios
      .put(url, stationData, config)
      .then((response) => {
        console.log("Success response:", response);
        alert("Station was updated successfully.");
        window.location.href = "/statistics";
      })
      .catch((error) => {
        console.error("Error response:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          const errorMessages = error.response.data.errors
            ? Object.entries(error.response.data.errors)
                .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
                .join("\n")
            : error.response.data.title || "Unknown error occurred.";
          alert(`Error: ${errorMessages}\nStatus: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request error:", error.request);
          alert(
            "No response received from the server. Please check your network connection and try again."
          );
        } else {
          console.error("Error message:", error.message);
          alert(`Error: ${error.message}`);
        }
        console.error("Error config:", error.config); // Log Axios config
      });
  };
}

export function fetchStation(id, isAuthenticated) {
  return function (dispatch) {
    const url = `https://api-dev.aviolog.com/api/v1/Station/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${isAuthenticated}`,
      },
    };

    return axios
      .get(url, config)
      .then((response) => {
        console.log("Fetched station data:", response.data);
        return response.data; // Ensure this data is returned properly
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
