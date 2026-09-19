export const validateName = (name: string): string => {
    const value = name.trim();

    if (!value) {
        return "Name is required";
    }

    if (value.length < 2) {
        return "Name must contain at least 2 characters";
    }

    if (!/^[A-Za-z ]+$/.test(value)) {
        return "Name should contain letters only";
    }

    return "";
};


export const validateMobile = (mobile: string): string => {
    const value = mobile.trim();

    if (!value) {
        return "Mobile number is required";
    }

    if (!/^[0-9]+$/.test(value)) {
        return "Mobile number should contain digits only";
    }

    if (value.length !== 10) {
        return "Mobile number must contain exactly 10 digits";
    }

    if (!/^[6-9]/.test(value)) {
        return "Enter a valid Indian mobile number";
    }

    return "";
};


export const validateRequired = (
    value: string,
    fieldName: string
): string => {
    if (!value.trim()) {
        return `${fieldName} is required`;
    }

    return "";
};