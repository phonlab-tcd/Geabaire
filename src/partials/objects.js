export const isDeepEqual = (obj1, obj2) => {
    // If both are the same reference or both are null/undefined, they are equal
    if (obj1 === obj2) {
      return true;
    }
  
    // If either is null or not an object, they are not equal
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
  
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    // If number of keys is different, they are not equal
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    // Sort keys to ensure order for comparison
    keys1.sort();
    keys2.sort();
  
    // Check if keys are the same in both objects
    for (let i = 0; i < keys1.length; i++) {
      if (keys1[i] !== keys2[i]) {
        return false;
      }
    }
  
    // Recursively check each property for equality
    for (let key of keys1) {
      // If values are objects, recursively compare
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!isDeepEqual(obj1[key], obj2[key])) {
          return false;
        }
      } else if (obj1[key] !== obj2[key]) {
        // If values are primitives, compare directly
        return false;
      }
    }
  
    // If all tests pass, objects are considered equal
    return true;
  }