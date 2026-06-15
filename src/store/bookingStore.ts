import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Booking } from "../types/bookings";

interface BookingState {
    // State
    bookings: Booking[];

    // Actions
    addBooking: (booking: Booking) => boolean;
    cancelBooking: (id: string) => void;
    isSlotTaken: (slotId: string) => boolean;
    clearAllBookings: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set, get) => ({
            bookings: [],

            addBooking: (booking: Booking): boolean => {
                // Check for duplicate booking
                if (get().isSlotTaken(booking.slotId)) {
                    return false;
                }

                // Check if slot is in the past
                if (Date.now() > booking.slot.timestamp) {
                    return false;
                }

                set((state) => ({
                    bookings: [...state.bookings, booking],
                }));

                return true;
            },

            cancelBooking: (id: string): void => {
                set((state) => ({
                    bookings: state.bookings.filter((b) => b.id !== id),
                }));
            },

            isSlotTaken: (slotId: string): boolean => {
                return get().bookings.some((b) => b.slotId === slotId);
            },

            clearAllBookings: (): void => {
                set({ bookings: [] });
            },
        }),
        {
            name: "booking-storage",              // AsyncStorage key
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);