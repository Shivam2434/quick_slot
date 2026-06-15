import { generateSlotsForDate } from '../../src/utils/slots';

describe('generateSlotsForDate', () => {
    // =============================================
    // SLOT GENERATION
    // =============================================
    describe('slot generation', () => {
        it('should generate exactly 16 slots for a full day (9 AM - 5 PM, 30 min intervals)', () => {
            // 8 hours × 2 slots per hour = 16 slots
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            expect(slots).toHaveLength(16);
        });

        it('should start at 9:00 AM', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            expect(slots[0].time).toBe('09:00 AM');
        });

        it('should end at 4:30 PM (last bookable slot)', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            expect(slots[slots.length - 1].time).toBe('04:30 PM');
        });

        it('should have 30-minute intervals between consecutive slots', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            for (let i = 1; i < slots.length; i++) {
                const diff = slots[i].timestamp - slots[i - 1].timestamp;
                const thirtyMinutesInMs = 30 * 60 * 1000;

                expect(diff).toBe(thirtyMinutesInMs);
            }
        });

        it('should generate slots with correct time sequence', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            const expectedTimes = [
                '09:00 AM', '09:30 AM',
                '10:00 AM', '10:30 AM',
                '11:00 AM', '11:30 AM',
                '12:00 PM', '12:30 PM',
                '01:00 PM', '01:30 PM',
                '02:00 PM', '02:30 PM',
                '03:00 PM', '03:30 PM',
                '04:00 PM', '04:30 PM',
            ];

            const generatedTimes = slots.map((s) => s.time);
            expect(generatedTimes).toEqual(expectedTimes);
        });
    });

    // =============================================
    // SLOT IDS
    // =============================================
    describe('slot IDs', () => {
        it('should generate unique IDs for each slot', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);
            const ids = slots.map((s) => s.id);
            const uniqueIds = new Set(ids);

            expect(uniqueIds.size).toBe(slots.length);
        });

        it('should generate IDs in format yyyy-MM-dd-HH-mm', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            expect(slots[0].id).toBe('2025-12-25-09-00');
            expect(slots[1].id).toBe('2025-12-25-09-30');
        });

        it('should include correct date in slot ID', () => {
            const date1 = new Date('2025-06-15');
            const date2 = new Date('2025-07-20');

            const slots1 = generateSlotsForDate(date1);
            const slots2 = generateSlotsForDate(date2);

            expect(slots1[0].id).toContain('2025-06-15');
            expect(slots2[0].id).toContain('2025-07-20');
        });
    });

    // =============================================
    // SLOT DATES
    // =============================================
    describe('slot dates', () => {
        it('should set correct date string on all slots', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            slots.forEach((slot) => {
                expect(slot.date).toBe('2025-12-25');
            });
        });

        it('should generate different dates for different input dates', () => {
            const slots1 = generateSlotsForDate(new Date('2025-06-15'));
            const slots2 = generateSlotsForDate(new Date('2025-06-16'));

            expect(slots1[0].date).toBe('2025-06-15');
            expect(slots2[0].date).toBe('2025-06-16');
        });
    });

    // =============================================
    // AVAILABILITY (PAST/FUTURE)
    // =============================================
    describe('availability', () => {
        it('should mark all slots as available for a future date', () => {
            const futureDate = new Date('2030-12-25');
            const slots = generateSlotsForDate(futureDate);

            slots.forEach((slot) => {
                expect(slot.isAvailable).toBe(true);
            });
        });

        it('should mark all slots as unavailable for a past date', () => {
            const pastDate = new Date('2020-01-01');
            const slots = generateSlotsForDate(pastDate);

            slots.forEach((slot) => {
                expect(slot.isAvailable).toBe(false);
            });
        });

        it('should have timestamps in ascending order', () => {
            const futureDate = new Date('2025-12-25');
            const slots = generateSlotsForDate(futureDate);

            for (let i = 1; i < slots.length; i++) {
                expect(slots[i].timestamp).toBeGreaterThan(slots[i - 1].timestamp);
            }
        });
    });

    // =============================================
    // EDGE CASES
    // =============================================
    describe('edge cases', () => {
        it('should handle leap year dates', () => {
            const leapDate = new Date('2028-02-29');
            const slots = generateSlotsForDate(leapDate);

            expect(slots).toHaveLength(16);
            expect(slots[0].date).toBe('2028-02-29');
        });

        it('should handle year boundary dates', () => {
            const newYearsEve = new Date('2025-12-31');
            const slots = generateSlotsForDate(newYearsEve);

            expect(slots).toHaveLength(16);
            expect(slots[0].date).toBe('2025-12-31');
        });

        it('should handle new year date', () => {
            const newYear = new Date('2026-01-01');
            const slots = generateSlotsForDate(newYear);

            expect(slots).toHaveLength(16);
            expect(slots[0].date).toBe('2026-01-01');
        });
    });
});