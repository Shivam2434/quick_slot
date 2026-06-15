export interface ValidationResult {
    isValid: boolean;
    error: string | null;
}

export const validateBooking = (
    name: string,
    reason: string,
    slotTimestamp: number
): ValidationResult => {
    if (!name || !name.trim()) {
        return {
            isValid: false,
            error: "Name is required",
        };
    }

    if (name.trim().length < 2) {
        return {
            isValid: false,
            error: "Name must be at least 2 characters",
        };
    }

    if (name.trim().length > 50) {
        return {
            isValid: false,
            error: "Name must be less than 50 characters",
        };
    }

    if (!reason || !reason.trim()) {
        return {
            isValid: false,
            error: "Reason for appointment is required",
        };
    }

    if (reason.trim().length < 5) {
        return {
            isValid: false,
            error: "Please provide a more detailed reason (min 5 characters)",
        };
    }

    if (reason.trim().length > 200) {
        return {
            isValid: false,
            error: "Reason must be less than 200 characters",
        };
    }

    if (Date.now() > slotTimestamp) {
        return {
            isValid: false,
            error: "Cannot book appointments in the past",
        };
    }

    return {
        isValid: true,
        error: null,
    };
};