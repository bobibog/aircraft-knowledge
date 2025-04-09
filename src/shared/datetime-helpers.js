export const datetimeStringToDateString = (dateString) => {
    if (!dateString) return "-"; // Handle null/undefined cases        
    // we must treat the date like this, otherwise JS would treat it like UTC
    // and convert it to local time (-2 hours currently), so the date would be
    // displayed as 1 day before!!!
    return dateString.split("T")[0]; // Extract YYYY-MM-DD
    // return new Date(dateString).toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

export const datetimeStringRemoveT = (dateTimeString) => {
    if (!dateTimeString) return "-";
    return dateTimeString.replace("T", " ").split(".")[0]; // Convert "T" to " " and remove milliseconds
};