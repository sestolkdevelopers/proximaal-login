export default function useValidation() {
    const required = (v) => (v && v.length) || 'The field is required';
    const password = (min) => {
        return (v) => v.length >= min || `A password of at least ${min} characters is required`;
    };
    const confirmPassword = (confirmed, min) => {
        return (v) => (v.length >= min && v === confirmed) || 'The confirmed password did not match the password';
    };

    return {
        required,
        password,
        confirmPassword,
    };
}
