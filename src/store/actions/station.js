import axios from '../../axios-azure';

export function addStation(id, stationId, latitude, longitude, city, country, locationAddress, lastActiveTime, feederName, feederEmail, feederPhone, description, notificationEmail, feederNotificationEmail, firstTimeSentToFeeder, isAuthenticated) {
  return function (dispatch) {
      var url = 'https://api-dev.aviolog.com/api/v1/Station';

      var stationData = {
          id: 0,
          stationId: stationId, 
          latitude: latitude,
          longitude: longitude,
          city: city || null,
          country: country || null,
          locationAddress: locationAddress || null,
          lastActiveTime: lastActiveTime || null,
          feederName: feederName,
          feederEmail: feederEmail,
          feederPhone: feederPhone || null,
          description: description || null,
          notificationEmail: notificationEmail || null,
          feederNotificationEmail: feederNotificationEmail || null,
          firstTimeSentToFeeder: firstTimeSentToFeeder || null
      };

      var config = {
          headers: { 'Authorization': 'Bearer ' + isAuthenticated }
      };

      axios.post(url, stationData, config)
          .then(function (response) {
              console.log("Success response:", response);
              alert("Station was added successfully.");
              window.location.href = "/stations";
          })
          .catch(function (error) {
              console.error("Error response:", error);
              
              if (error.response) {
                  console.error("Error data:", error.response.data);
                  console.error("Error status:", error.response.status);
                  console.error("Error headers:", error.response.headers);
                  alert(`Error: ${error.response.data.message || 'Unknown error'}\nStatus: ${error.response.status}\nHeaders: ${JSON.stringify(error.response.headers)}`);
              } else if (error.request) {
                  console.error("Request data:", error.request);
                  alert("No response received from the server. Please check your network connection and try again.");
              } else {
                  console.error("Error message:", error.message);
                  alert(`Error: ${error.message}`);
              }

              console.error("Error config:", error.config);
          });
  }
};
