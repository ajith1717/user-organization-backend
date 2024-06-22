function compareObjects(oldData, newData) {
    const changes = {};

    // Loop through keys in newData
    for (const key in newData) {
        // Check if key exists in oldData
        if (oldData.hasOwnProperty(key)) {
            // Date comparison ignoring milliseconds
            if (isValidDate(newData[key]) && areDatesEqualIgnoringMilliseconds(oldData[key], newData[key])) {
                continue; // Dates are the same, skip
            } else if (!deepCompare(oldData[key], newData[key])) {
                changes[key] = {
                    old: oldData[key],  // Optional: uncomment to include old value
                    new: newData[key],
                };
            }
        } else {
            // New key in newData
            changes[key] = {
                new: newData[key],
            };
        }
    }
    console.log(changes)
    return changes;
}

// Helper function for deep comparison (excluding functions)
function deepCompare(obj1, obj2) {
    const type1 = typeof obj1;
    const type2 = typeof obj2;

    // If one is object and other is not, not same
    if (type1 !== type2 || (type1 === 'object' && type2 !== 'object')) {
        return false;
    }

    // If both are null, they are equal
    if (obj1 === null && obj2 === null) {
        return true;
    }

    // If both are functions, not same (prevents infinite recursion)
    if (type1 === 'function' || type2 === 'function') {
        return false;
    }

    // If both are objects, compare recursively
    if (type1 === 'object') {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (!deepCompare(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    // Otherwise, compare primitive values
    return obj1 === obj2;
}


function isValidDate(dateString) {
    // Regular expression for a valid date/time string (with optional milliseconds and time zone offset)
    const regex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?)?(?:Z|[+-])\d{2}:\d{2}$/;

    // Test the string against the regular expression
    return regex.test(dateString) && new Date(dateString).getTime() !== NaN;
}

// Check if the key is likely a date string based on format
function isDateKey(key) {
    return key.includes('date') || key.includes('Arrival') || key.includes('PreHospital');
}

// Compare two date strings, ignoring milliseconds
function areDatesEqualIgnoringMilliseconds(date1, date2) {
    const dateWithoutMs1 = new Date(new Date(date1).toISOString().slice(0, -1)); // Remove milliseconds
    const dateWithoutMs2 = new Date(new Date(date2).toISOString().slice(0, -1)); // Remove milliseconds
    return dateWithoutMs1.getTime() === dateWithoutMs2.getTime();
}



exports.compareObjects = compareObjects