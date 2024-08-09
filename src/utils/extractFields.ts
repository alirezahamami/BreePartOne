interface MatchField {
    fieldName: string;
  }
  
interface MatchSummary {
matchFields?: MatchField[];
}

interface SanctionList {
matchSummary?: MatchSummary;
}

const extractFields = (resultArray: SanctionList[]): string[] => {
const targetField = ["Citizenship", "DOB", "Name"]; // Fields to be extracted
const resultSet = new Set<string>(); // Use Set to avoid duplicates

resultArray.forEach(sanctionList => {
    // Type assertion to let TypeScript know the type of matchFields
    const filteredFields: MatchField[] = sanctionList.matchSummary?.matchFields?.filter(field =>
    targetField.includes(field.fieldName) 
) || []; // Default to empty array if matchFields is undefined or null

    filteredFields.forEach(item => {
    if (targetField.includes(item.fieldName)) { // Check if field is in targetField
        resultSet.add(item.fieldName); // Add field to resultSet
    }
    });
});

return Array.from(resultSet); // Convert Set to Array and return
};

export { extractFields };