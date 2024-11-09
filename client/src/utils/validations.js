export const bugReportValidations = {
    title: {
        pattern: /^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{3,100}$/,
        minLength: 3,
        maxLength: 100,
        validate: (value) => {
            if (!value) return 'שדה חובה';
            if (value.length < 3) return 'כותרת חייבת להכיל לפחות 3 תווים';
            if (value.length > 100) return 'כותרת יכולה להכיל עד 100 תווים';
            if (!value.match(/^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{3,100}$/)) {
                return 'כותרת יכולה להכיל רק אותיות בעברית ובאנגלית, מספרים וסימני פיסוק בסיסיים';
            }
            return '';
        }
    },
    description: {
        pattern: /^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{10,1000}$/,
        minLength: 10,
        maxLength: 1000,
        validate: (value) => {
            if (!value) return 'שדה חובה';
            if (value.length < 10) return 'תיאור חייב להכיל לפחות 10 תווים';
            if (value.length > 1000) return 'תיאור יכול להכיל עד 1000 תווים';
            if (!value.match(/^[\u0590-\u05FFa-zA-Z0-9\s.,!?()-]{10,1000}$/)) {
                return 'תיאור יכול להכיל רק אותיות בעברית ובאנגלית, מספרים וסימני פיסוק בסיסיים';
            }
            return '';
        }
    },
    email: {
        validate: (value) => {
            if (!value) return ''; // Email is optional
            if (value.length > 100) return 'אימייל יכול להכיל עד 100 תווים';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'כתובת אימייל לא תקינה';
            return '';
        }
    }
}; 