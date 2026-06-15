# QuickSlot — Appointment Scheduler

A React Native mobile app for booking appointments with real-time slot management.

## Features
- Browse available time slots (9 AM - 5 PM, 30 min intervals)
- Book appointments with form validation
- Cancel upcoming appointments
- Date picker for future bookings (up to 30 days)
- Dark/Light theme support
- Local data persistence
- Double-booking prevention

## Tech Stack
- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **Navigation:** Expo Router (file-based)
- **State Management:** Zustand (with persist middleware)
- **Date Utilities:** date-fns
- **Storage:** AsyncStorage
- **Testing:** Jest + ts-jest
- **Theming:** Custom theme system with dark/light mode

## Setup
```bash
npm install
npx expo start