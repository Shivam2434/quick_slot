import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addDays, format, isBefore, isToday, startOfDay, subDays } from 'date-fns';
import { Link, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    FlatList,
    Platform,
    StyleSheet as RNStyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import { useThemeColors } from '../../constants/theme';
import { useBookingStore } from '../../store/bookingStore';
import { TimeSlot } from '../../types/bookings';
import { generateSlotsForDate } from '../../utils/slots';
import { getStyles } from './styles';

export default function SlotsScreen() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const colors = useThemeColors();
    const s = useMemo(() => getStyles(colors), [colors]);

    const { isSlotTaken, bookings } = useBookingStore();
    const router = useRouter();

    const slotsWithStatus = useMemo(() => {
        const slots = generateSlotsForDate(selectedDate);
        return slots.map((slot) => ({
            ...slot,
            isBooked: isSlotTaken(slot.id),
        }));
    }, [selectedDate, bookings]);

    const availableCount = slotsWithStatus.filter(
        (sl) => sl.isAvailable && !sl.isBooked
    ).length;

    const canGoPrevious = !isToday(selectedDate);
    const maxDate = addDays(new Date(), 30);
    const canGoNext = isBefore(selectedDate, addDays(new Date(), 29));

    const handlePreviousDay = () => {
        if (!canGoPrevious) return;
        setSelectedDate((prev) => subDays(prev, 1));
    };

    const handleNextDay = () => {
        if (!canGoNext) return;
        setSelectedDate((prev) => addDays(prev, 1));
    };

    const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
        setShowPicker(false);
        if (date) {
            const today = startOfDay(new Date());
            if (isBefore(startOfDay(date), today)) {
                setSelectedDate(new Date());
            } else {
                setSelectedDate(date);
            }
        }
    };

    const getDateLabel = (): string => {
        if (isToday(selectedDate)) return 'Today';
        const tomorrow = addDays(new Date(), 1);
        if (format(selectedDate, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) {
            return 'Tomorrow';
        }
        return format(selectedDate, 'EEEE');
    };

    const renderSlot = ({ item }: { item: TimeSlot & { isBooked: boolean } }) => {
        const isPastSlot = !item.isAvailable;
        const isDisabled = item.isBooked || isPastSlot;

        let statusText = 'Tap to book →';
        let statusStyle: TextStyle = s.available;

        if (isPastSlot) {
            statusText = 'Past';
            statusStyle = s.badgeGreyText;
        } else if (item.isBooked) {
            statusText = 'Booked';
            statusStyle = s.badgeRedText;
        }

        const slotCardStyle = RNStyleSheet.flatten([
            s.slotCard,
            isDisabled && s.slotDisabled,
        ]);

        const timeTextStyle = RNStyleSheet.flatten([
            s.timeText,
            isDisabled && s.disabledText,
        ]);

        const content = (
            <TouchableOpacity style={slotCardStyle} disabled={isDisabled}>
                <Text style={timeTextStyle}>{item.time}</Text>
                <Text style={statusStyle}>{statusText}</Text>
            </TouchableOpacity>
        );

        if (isDisabled) return content;

        return (
            <Link
                href={{
                    pathname: '/book',
                    params: { slotId: item.id },
                }}
                asChild
            >
                {content}
            </Link>
        );
    };

    return (
        <View style={s.container}>
            {/* Date Picker */}
            <View style={s.datePickerContainer}>
                <View style={s.datePickerRow}>
                    <TouchableOpacity
                        style={RNStyleSheet.flatten([
                            s.dateArrowButton,
                            !canGoPrevious && s.dateArrowDisabled,
                        ])}
                        onPress={handlePreviousDay}
                        disabled={!canGoPrevious}
                    >
                        <Text style={s.dateArrowText}>←</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={s.dateTouchable}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={s.dateSelectedText}>
                            {format(selectedDate, 'MMM dd, yyyy')}
                        </Text>
                        <Text style={isToday(selectedDate) ? s.todayBadge : s.dateLabelText}>
                            {getDateLabel()} • Tap to change
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={RNStyleSheet.flatten([
                            s.dateArrowButton,
                            !canGoNext && s.dateArrowDisabled,
                        ])}
                        onPress={handleNextDay}
                        disabled={!canGoNext}
                    >
                        <Text style={s.dateArrowText}>→</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showPicker && (
                <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    maximumDate={maxDate}
                />
            )}

            {/* Header */}
            <View style={s.headerRow}>
                <Text style={s.header}>Available Slots</Text>
                <View style={s.availableBadge}>
                    <Text style={s.availableBadgeText}>{availableCount} available</Text>
                </View>
            </View>

            {/* Slots */}
            {slotsWithStatus.length > 0 ? (
                <FlatList
                    data={slotsWithStatus}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={s.list}
                    extraData={bookings}
                    renderItem={renderSlot}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={s.emptyContainer}>
                    <Text style={s.emptyText}>No slots available for this date</Text>
                </View>
            )}

            {/* Bottom Button */}
            <TouchableOpacity
                style={s.button}
                onPress={() => router.push('/my-bookings')}
                activeOpacity={0.8}
            >
                <Text style={s.buttonText}>View My Bookings</Text>
            </TouchableOpacity>
        </View>
    );
}