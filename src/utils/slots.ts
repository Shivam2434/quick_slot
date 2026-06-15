import {
    addMinutes,
    format,
    isPast,
    setHours,
    setMinutes,
    startOfDay,
} from "date-fns";
import { TimeSlot } from "../types/bookings";

const WORKING_HOURS_START = 9;   // 9:00 AM
const WORKING_HOURS_END = 17;    // 5:00 PM
const SLOT_INTERVAL_MINUTES = 30;

export const generateSlotsForDate = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];

    // Set start time to 9:00 AM of given date
    let current = setMinutes(
        setHours(startOfDay(date), WORKING_HOURS_START),
        0
    );

    // Set end time to 5:00 PM of given date
    const end = setMinutes(
        setHours(startOfDay(date), WORKING_HOURS_END),
        0
    );

    while (current < end) {
        const timestamp = current.getTime();

        slots.push({
            id: format(current, "yyyy-MM-dd-HH-mm"),
            date: format(current, "yyyy-MM-dd"),
            time: format(current, "hh:mm a"),       // 12-hour format (e.g., 09:00 AM)
            timestamp,
            isAvailable: !isPast(current),           // false if time already passed
        });

        current = addMinutes(current, SLOT_INTERVAL_MINUTES);
    }

    return slots;
};