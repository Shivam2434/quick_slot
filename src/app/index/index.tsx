import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useThemeColors } from '../../constants/theme';
import { useBookingStore } from '../../store/bookingStore';
import { getStyles } from './styles';

export default function HomeScreen() {
    const router = useRouter();
    const colors = useThemeColors();
    const styles = useMemo(() => getStyles(colors), [colors]);
    const { bookings } = useBookingStore();

    const activeBookings = bookings.filter(
        (b) => b.slot.timestamp > Date.now()
    ).length;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.iconCircle}>
                    <Text style={styles.iconText}>📅</Text>
                </View>

                <Text style={styles.title}>QuickSlot</Text>
                <Text style={styles.subtitle}>
                    Book your appointments quickly and easily.{'\n'}
                    No hassle, no waiting.
                </Text>

                <View style={styles.featureRow}>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIconCircle}>
                            <Text style={styles.featureIcon}>⚡</Text>
                        </View>
                        <Text style={styles.featureText}>Quick Booking</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIconCircle}>
                            <Text style={styles.featureIcon}>🕐</Text>
                        </View>
                        <Text style={styles.featureText}>30 Min Slots</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <View style={styles.featureIconCircle}>
                            <Text style={styles.featureIcon}>✅</Text>
                        </View>
                        <Text style={styles.featureText}>Easy Cancel</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/slots')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryButtonText}>Book an Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/my-bookings')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.secondaryButtonText}>
                        My Bookings{activeBookings > 0 ? ` (${activeBookings})` : ''}
                    </Text>
                    {activeBookings > 0 && (
                        <Text style={styles.bookingCount}>
                            {activeBookings} upcoming appointment{activeBookings !== 1 ? 's' : ''}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}