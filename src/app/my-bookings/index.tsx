import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../constants/theme';
import { useBookingStore } from '../../store/bookingStore';
import { getStyles } from './styles';

export default function MyBookingsScreen() {
    const { bookings, cancelBooking } = useBookingStore();
    const router = useRouter();
    const colors = useThemeColors();
    const s = useMemo(() => getStyles(colors), [colors]);

    const handleCancel = (id: string) => {
        Alert.alert(
            'Cancel Booking',
            'Are you sure you want to cancel this appointment?',
            [
                { text: 'Keep', style: 'cancel' },
                {
                    text: 'Cancel Appointment',
                    style: 'destructive',
                    onPress: () => cancelBooking(id),
                },
            ]
        );
    };

    const sortedBookings = [...bookings].sort(
        (a, b) => a.slot.timestamp - b.slot.timestamp
    );

    const upcomingCount = bookings.filter(
        (b) => b.slot.timestamp > Date.now()
    ).length;

    if (bookings.length === 0) {
        return (
            <View style={s.emptyContainer}>
                <Text style={s.emptyIcon}>📭</Text>
                <Text style={s.emptyTitle}>No Bookings Yet</Text>
                <Text style={s.emptyText}>
                    You haven't booked any appointments.{'\n'}
                    Let's schedule one!
                </Text>
                <TouchableOpacity
                    style={s.button}
                    onPress={() => router.push('/slots')}
                    activeOpacity={0.8}
                >
                    <Text style={s.buttonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={s.container}>
            <View style={s.headerRow}>
                <Text style={s.headerTitle}>Your Appointments</Text>
                <View style={s.countBadge}>
                    <Text style={s.countBadgeText}>{upcomingCount} upcoming</Text>
                </View>
            </View>

            <FlatList
                data={sortedBookings}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const isExpired = Date.now() > item.slot.timestamp;

                    return (
                        <View style={[s.card, isExpired && s.expiredCard]}>
                            <View style={s.cardHeader}>
                                <Text style={s.time}>{item.slot.time}</Text>
                                <View
                                    style={[
                                        s.statusBadge,
                                        isExpired ? s.expiredBadge : s.upcomingBadge,
                                    ]}
                                >
                                    <Text
                                        style={
                                            isExpired ? s.expiredBadgeText : s.upcomingBadgeText
                                        }
                                    >
                                        {isExpired ? 'Expired' : 'Upcoming'}
                                    </Text>
                                </View>
                            </View>

                            <Text style={s.date}>{item.slot.date}</Text>
                            <View style={s.divider} />
                            <Text style={s.name}>{item.name}</Text>
                            <Text style={s.reason}>{item.reason}</Text>

                            {!isExpired && (
                                <TouchableOpacity
                                    style={s.cancelButton}
                                    onPress={() => handleCancel(item.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={s.cancelText}>Cancel Appointment</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}