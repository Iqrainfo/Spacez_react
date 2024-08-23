export const CustomDateFormatter = (dates) => {
    console.log();
    const monthAbbreviation = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dates);
    const formattedDate =
        dates.getDate().toString().padStart(2, '0')
        + ' ' + monthAbbreviation
        + ' ' + dates.getFullYear();

    return formattedDate;
}

export function calculateMonths(startDate, endDate) {
    // Convert the input strings to Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Calculate the difference in months
    const monthsDifference = (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
        (endDateObj.getMonth() - startDateObj.getMonth());

    return monthsDifference +1;
}

export function formatDateNumeric(inputDate) {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to get 1-based month index
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
export const formatDateTable = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    };
    if (dateString) {
        const formattedDate = new Date(dateString).toLocaleString('en-IN', options);
        return formattedDate;
    } else {
        return dateString;
    }
};