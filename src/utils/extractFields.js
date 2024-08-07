const extractFields = (resultArray) => {
    const targetField=["Citizenship", "DOB", "Name"]
    const resultSet = new Set();
    resultArray.forEach(sanctionList => {
        const filteredFields = sanctionList.matchSummary?.matchFields || []
            .filter(field => targetField.includes(field.fieldName));

        filteredFields.forEach(item => {
            if (targetField.includes(item.fieldName)) {
                resultSet.add(item.fieldName);
            }
        });
    });
    return Array.from(resultSet);
};

module.exports = { extractFields };