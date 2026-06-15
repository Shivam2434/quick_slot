export interface TimeSlot {
    id: string;
    date: string;
    time: string;
    timestamp: number;
    isAvailable: boolean;
}

export interface Booking {
    id: string;
    slotId: string;
    name: string;
    reason: string;
    createdAt: number;
    slot: TimeSlot;
}