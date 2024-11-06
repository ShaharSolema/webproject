export const validateIsraeliCreditCard = (number) => {
    // Remove all non-digit characters
    const cleanNumber = number.replace(/\D/g, '');
    
    // Test card for development (all same digits)
    if (new Set(cleanNumber).size === 1 && cleanNumber.length === 16) {
        return true;
    }

    // Check length (Israeli cards are typically 16 digits)
    if (cleanNumber.length !== 16) {
        return false;
    }

    // Check prefix (Israeli cards usually start with these numbers)
    const validPrefixes = ['4580', '4576', '5326', '5329', '53', '51', '52'];
    const hasValidPrefix = validPrefixes.some(prefix => cleanNumber.startsWith(prefix));
    
    if (!hasValidPrefix) {
        return false;
    }

    // Luhn algorithm validation
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i));

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return (sum % 10) === 0;
};

export const formatIsraeliCreditCard = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length <= 4) return cleanNumber;
    if (cleanNumber.length <= 8) return cleanNumber.slice(0,4) + '-' + cleanNumber.slice(4);
    if (cleanNumber.length <= 12) return cleanNumber.slice(0,4) + '-' + cleanNumber.slice(4,8) + '-' + cleanNumber.slice(8);
    return cleanNumber.slice(0,4) + '-' + cleanNumber.slice(4,8) + '-' + cleanNumber.slice(8,12) + '-' + cleanNumber.slice(12);
}; 