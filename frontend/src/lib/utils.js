// ✅ Define formatting options for the date
const options = {
	month: "short",
	day: "numeric",
	year: "numeric",
};

// ✅ Function to format a JavaScript Date object into a readable string
const formatDate = (date) => {
	return date.toLocaleDateString("en-us", options);
};

// ✅ Export the utility function for use in other modules
export default formatDate;
