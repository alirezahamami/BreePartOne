const extractFields = (resultArray) => {
    const targetField = ["Citizenship", "DOB", "Name"]; // Fields to be extracted
    const resultSet = new Set(); // Use Set to avoid duplicates
    
    resultArray.forEach(sanctionList => {
        const filteredFields = sanctionList.matchSummary?.matchFields || [] 
            .filter(field => targetField.includes(field.fieldName)); // Filter fields by targetField
        
        filteredFields.forEach(item => {
            if (targetField.includes(item.fieldName)) { // Check if field is in targetField
                resultSet.add(item.fieldName); // Add field to resultSet
            }
        });
    });

    return Array.from(resultSet); // Convert Set to Array and return
};

module.exports = { extractFields }; // Export the function
