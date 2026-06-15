import { useBookingStore } from '../../src/store/bookingStore';
import { Booking, TimeSlot } from '../../src/types/bookings';

// ✅ Always 1 year in the future from when tests run
const FUTURE_TIMESTAMP = Date.now() + 365 * 24 * 60 * 60 * 1000;
const PAST_TIMESTAMP = Date.now() - 60 * 60 * 1000;

// Helper to create a mock slot
const createMockSlot = (overrides?: Partial<TimeSlot>): TimeSlot => ({
    id: 'future-slot-09-00',
    date: '2099-12-25',
    time: '09:00 AM',
    timestamp: FUTURE_TIMESTAMP,   // ← Always future
    isAvailable: true,
    ...overrides,
});

// Helper to create a mock booking
const createMockBooking = (overrides?: Partial<Booking>): Booking => ({
    id: Date.now().toString(),
    slotId: 'future-slot-09-00',
    name: 'John Doe',
    reason: 'Dental checkup',
    createdAt: Date.now(),
    slot: createMockSlot(),
    ...overrides,
});

describe('bookingStore', () => {
    beforeEach(() => {
        useBookingStore.getState().clearAllBookings();
    });

    // =============================================
    // INITIAL STATE
    // =============================================
    describe('initial state', () => {
        it('should start with empty bookings', () => {
            const { bookings } = useBookingStore.getState();

            expect(bookings).toEqual([]);
            expect(bookings).toHaveLength(0);
        });
    });

    // =============================================
    // ADD BOOKING
    // =============================================
    describe('addBooking', () => {
        it('should add a booking successfully', () => {
            const { addBooking } = useBookingStore.getState();
            const booking = createMockBooking();

            const result = addBooking(booking);

            expect(result).toBe(true);
            expect(useBookingStore.getState().bookings).toHaveLength(1);
        });

        it('should store correct booking data', () => {
            const { addBooking } = useBookingStore.getState();
            const booking = createMockBooking({
                name: 'Jane Smith',
                reason: 'Eye examination',
            });

            addBooking(booking);

            const stored = useBookingStore.getState().bookings[0];
            expect(stored.name).toBe('Jane Smith');
            expect(stored.reason).toBe('Eye examination');
            expect(stored.slotId).toBe('future-slot-09-00');
        });

        it('should add multiple bookings for different slots', () => {
            const { addBooking } = useBookingStore.getState();

            const booking1 = createMockBooking({
                id: '1',
                slotId: 'future-slot-09-00',
                slot: createMockSlot({
                    id: 'future-slot-09-00',
                    timestamp: FUTURE_TIMESTAMP,
                }),
            });

            const booking2 = createMockBooking({
                id: '2',
                slotId: 'future-slot-10-00',
                slot: createMockSlot({
                    id: 'future-slot-10-00',
                    timestamp: FUTURE_TIMESTAMP + 60 * 60 * 1000, // 1 hour later
                }),
            });

            expect(addBooking(booking1)).toBe(true);
            expect(addBooking(booking2)).toBe(true);
            expect(useBookingStore.getState().bookings).toHaveLength(2);
        });

        it('should prevent duplicate booking for same slot', () => {
            const { addBooking } = useBookingStore.getState();
            const booking1 = createMockBooking({ id: '1' });
            const booking2 = createMockBooking({ id: '2' }); // Same slotId

            addBooking(booking1);
            const result = addBooking(booking2);

            expect(result).toBe(false);
            expect(useBookingStore.getState().bookings).toHaveLength(1);
        });

        it('should reject booking for past slot', () => {
            const { addBooking } = useBookingStore.getState();

            const pastSlot = createMockSlot({
                id: 'past-slot-09-00',
                timestamp: PAST_TIMESTAMP, // ← Definitely in the past
                isAvailable: false,
            });

            const booking = createMockBooking({
                slotId: 'past-slot-09-00',
                slot: pastSlot,
            });

            const result = addBooking(booking);

            expect(result).toBe(false);
            expect(useBookingStore.getState().bookings).toHaveLength(0);
        });
    });

    // =============================================
    // CANCEL BOOKING
    // =============================================
    describe('cancelBooking', () => {
        it('should remove a booking by id', () => {
            const { addBooking, cancelBooking } = useBookingStore.getState();
            const booking = createMockBooking({ id: 'booking-1' });

            addBooking(booking);
            expect(useBookingStore.getState().bookings).toHaveLength(1);

            cancelBooking('booking-1');
            expect(useBookingStore.getState().bookings).toHaveLength(0);
        });

        it('should only remove the specified booking', () => {
            const { addBooking, cancelBooking } = useBookingStore.getState();

            const booking1 = createMockBooking({
                id: 'booking-1',
                slotId: 'future-slot-09-00',
                slot: createMockSlot({
                    id: 'future-slot-09-00',
                    timestamp: FUTURE_TIMESTAMP,
                }),
            });

            const booking2 = createMockBooking({
                id: 'booking-2',
                slotId: 'future-slot-10-00',
                slot: createMockSlot({
                    id: 'future-slot-10-00',
                    timestamp: FUTURE_TIMESTAMP + 60 * 60 * 1000,
                }),
            });

            addBooking(booking1);
            addBooking(booking2);

            cancelBooking('booking-1');

            const remaining = useBookingStore.getState().bookings;
            expect(remaining).toHaveLength(1);
            expect(remaining[0].id).toBe('booking-2');
        });

        it('should handle cancelling non-existent booking gracefully', () => {
            const { cancelBooking } = useBookingStore.getState();

            expect(() => cancelBooking('non-existent-id')).not.toThrow();
            expect(useBookingStore.getState().bookings).toHaveLength(0);
        });

        it('should free up the slot after cancellation', () => {
            const { addBooking, cancelBooking } = useBookingStore.getState();
            const slotId = 'future-slot-09-00';
            const booking = createMockBooking({ id: 'booking-1', slotId });

            addBooking(booking);
            expect(useBookingStore.getState().isSlotTaken(slotId)).toBe(true);

            cancelBooking('booking-1');
            expect(useBookingStore.getState().isSlotTaken(slotId)).toBe(false);
        });
    });

    // =============================================
    // IS SLOT TAKEN
    // =============================================
    describe('isSlotTaken', () => {
        it('should return false for unbooked slot', () => {
            const { isSlotTaken } = useBookingStore.getState();

            expect(isSlotTaken('future-slot-09-00')).toBe(false);
        });

        it('should return true for booked slot', () => {
            const { addBooking } = useBookingStore.getState();
            const booking = createMockBooking({ slotId: 'future-slot-09-00' });

            addBooking(booking);

            expect(useBookingStore.getState().isSlotTaken('future-slot-09-00')).toBe(true);
        });

        it('should return false for different slot ID', () => {
            const { addBooking } = useBookingStore.getState();
            const booking = createMockBooking({ slotId: 'future-slot-09-00' });

            addBooking(booking);

            expect(useBookingStore.getState().isSlotTaken('future-slot-10-00')).toBe(false);
        });
    });

    // =============================================
    // CLEAR ALL BOOKINGS
    // =============================================
    describe('clearAllBookings', () => {
        it('should remove all bookings', () => {
            const { addBooking, clearAllBookings } = useBookingStore.getState();

            const booking1 = createMockBooking({
                id: '1',
                slotId: 'future-slot-09-00',
                slot: createMockSlot({
                    id: 'future-slot-09-00',
                    timestamp: FUTURE_TIMESTAMP,
                }),
            });

            const booking2 = createMockBooking({
                id: '2',
                slotId: 'future-slot-10-00',
                slot: createMockSlot({
                    id: 'future-slot-10-00',
                    timestamp: FUTURE_TIMESTAMP + 60 * 60 * 1000,
                }),
            });

            addBooking(booking1);
            addBooking(booking2);

            expect(useBookingStore.getState().bookings).toHaveLength(2);

            clearAllBookings();

            expect(useBookingStore.getState().bookings).toHaveLength(0);
        });

        it('should handle clearing already empty store', () => {
            const { clearAllBookings } = useBookingStore.getState();

            expect(() => clearAllBookings()).not.toThrow();
            expect(useBookingStore.getState().bookings).toHaveLength(0);
        });
    });

    // =============================================
    // RACE CONDITION SIMULATION
    // =============================================
    describe('race condition handling', () => {
        it('should not allow two bookings for the same slot even if called rapidly', () => {
            const store = useBookingStore.getState();
            const slotId = 'future-slot-09-00';

            const booking1 = createMockBooking({ id: '1', slotId });
            const booking2 = createMockBooking({ id: '2', slotId });

            const result1 = store.addBooking(booking1);
            const result2 = store.addBooking(booking2);

            expect(result1).toBe(true);
            expect(result2).toBe(false);
            expect(useBookingStore.getState().bookings).toHaveLength(1);
            expect(useBookingStore.getState().bookings[0].id).toBe('1');
        });
    });
});