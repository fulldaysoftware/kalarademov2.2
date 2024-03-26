export default function formatDate(dateString) {
  try {
    // Parse the ISO 8601 date string
    const dateObj = new Date(dateString);

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date format.';
    }

    // Extract year, month (0-indexed), and day
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth(); // JavaScript months are 0-indexed

    // Month names for formatting (optional for full month names)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    // Format the date string with desired format
    return `${year}/${monthNames[month] || (month + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date format.';
  }
}
