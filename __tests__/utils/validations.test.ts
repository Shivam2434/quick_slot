import { validateBooking } from '../../src/utils/validations';

describe('validateBooking', () => {
    // Helper: timestamp 1 hour in the future
    const futureTimestamp = Date.now() + 60 * 60 * 1000;

    // Helper: timestamp 1 hour in the past
    const pastTimestamp = Date.now() - 60 * 60 * 1000;

    // =============================================
    // VALID BOOKINGS
    // =============================================
    describe('valid bookings', () => {
        it('should return valid for correct inputs', () => {
            const result = validateBooking('John Doe', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(true);
            expect(result.error).toBeNull();
        });

        it('should accept minimum valid name (2 characters)', () => {
            const result = validateBooking('Jo', 'Regular checkup visit', futureTimestamp);

            expect(result.isValid).toBe(true);
            expect(result.error).toBeNull();
        });

        it('should accept minimum valid reason (5 characters)', () => {
            const result = validateBooking('John Doe', 'Check', futureTimestamp);

            expect(result.isValid).toBe(true);
            expect(result.error).toBeNull();
        });

        it('should accept maximum length name (50 characters)', () => {
            const longName = 'A'.repeat(50);
            const result = validateBooking(longName, 'Regular checkup', futureTimestamp);

            expect(result.isValid).toBe(true);
        });

        it('should accept maximum length reason (200 characters)', () => {
            const longReason = 'A'.repeat(200);
            const result = validateBooking('John', longReason, futureTimestamp);

            expect(result.isValid).toBe(true);
        });
    });

    // =============================================
    // NAME VALIDATION
    // =============================================
    describe('name validation', () => {
        it('should reject empty name', () => {
            const result = validateBooking('', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name is required');
        });

        it('should reject whitespace-only name', () => {
            const result = validateBooking('   ', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name is required');
        });

        it('should reject name shorter than 2 characters', () => {
            const result = validateBooking('J', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name must be at least 2 characters');
        });

        it('should reject name longer than 50 characters', () => {
            const longName = 'A'.repeat(51);
            const result = validateBooking(longName, 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name must be less than 50 characters');
        });

        it('should trim name before validating length', () => {
            // "  J  " trims to "J" which is 1 character — should fail
            const result = validateBooking('  J  ', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name must be at least 2 characters');
        });
    });

    // =============================================
    // REASON VALIDATION
    // =============================================
    describe('reason validation', () => {
        it('should reject empty reason', () => {
            const result = validateBooking('John Doe', '', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Reason for appointment is required');
        });

        it('should reject whitespace-only reason', () => {
            const result = validateBooking('John Doe', '    ', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Reason for appointment is required');
        });

        it('should reject reason shorter than 5 characters', () => {
            const result = validateBooking('John Doe', 'Test', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Please provide a more detailed reason (min 5 characters)');
        });

        it('should reject reason longer than 200 characters', () => {
            const longReason = 'A'.repeat(201);
            const result = validateBooking('John Doe', longReason, futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Reason must be less than 200 characters');
        });
    });

    // =============================================
    // TIMESTAMP VALIDATION
    // =============================================
    describe('timestamp validation', () => {
        it('should reject past timestamps', () => {
            const result = validateBooking('John Doe', 'Dental checkup', pastTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Cannot book appointments in the past');
        });

        it('should accept future timestamps', () => {
            const result = validateBooking('John Doe', 'Dental checkup', futureTimestamp);

            expect(result.isValid).toBe(true);
        });

        it('should reject timestamp from yesterday', () => {
            const yesterday = Date.now() - 24 * 60 * 60 * 1000;
            const result = validateBooking('John Doe', 'Dental checkup', yesterday);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Cannot book appointments in the past');
        });

        it('should accept timestamp for tomorrow', () => {
            const tomorrow = Date.now() + 24 * 60 * 60 * 1000;
            const result = validateBooking('John Doe', 'Dental checkup', tomorrow);

            expect(result.isValid).toBe(true);
        });
    });

    // =============================================
    // VALIDATION PRIORITY
    // =============================================
    describe('validation priority', () => {
        it('should check name before reason', () => {
            // Both name and reason are invalid, but name error should come first
            const result = validateBooking('', '', futureTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name is required');
        });

        it('should check reason before timestamp', () => {
            // Both reason and timestamp are invalid, but reason error should come first
            const result = validateBooking('John Doe', '', pastTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Reason for appointment is required');
        });

        it('should check name first when everything is invalid', () => {
            const result = validateBooking('', '', pastTimestamp);

            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name is required');
        });
    });
});