function extractJSONFromString(inputString) {
    // Find the index of the JSON string within the inputString
    const startIndex = inputString.indexOf('{');
    const endIndex = inputString.lastIndexOf('}');
    
    if (startIndex === -1 || endIndex === -1) {
        // If the JSON string is not found, return null or handle the error accordingly
        return null;
    }
    
    // Extract the JSON string
    const jsonString = inputString.substring(startIndex, endIndex + 1);

    try {
        // Parse the extracted JSON string
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    } catch (error) {
        // Handle JSON parsing errors
        console.error('Error parsing JSON:', error);
        return null;
    }
}

export default extractJSONFromString