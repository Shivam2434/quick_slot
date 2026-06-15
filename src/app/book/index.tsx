import { parse } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useThemeColors } from '../../constants/theme';
import { useBookingStore } from '../../store/bookingStore';
import { generateSlotsForDate } from '../../utils/slots';
import { validateBooking } from '../../utils/validations';
import { getStyles } from './styles';

export default function BookScreen() {
    const { slotId } = useLocalSearchParams<{ slotId?: string }>();
    const router = useRouter();
    const colors = useThemeColors();
    const s = useMemo(() => getStyles(colors), [colors]);

    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [nameFocused, setNameFocused] = useState(false);
    const [reasonFocused, setReasonFocused] = useState(false);

    const { addBooking, isSlotTaken } = useBookingStore();

    const slot = useMemo(() => {
        if (!slotId) return null;
        const parts = slotId.split('-');
        if (parts.length < 5) return null;
        const dateString = `${parts[0]}-${parts[1]}-${parts[2]}`;
        const slotDate = parse(dateString, 'yyyy-MM-dd', new Date());
        const slots = generateSlotsForDate(slotDate);
        return slots.find((sl) => sl.id === slotId) || null;
    }, [slotId]);

    if (!slot) {
        return (
            <View style={s.container}>
                <Text style={s.errorText}>Invalid or missing slot selection</Text>
                <TouchableOpacity style={s.backButton} onPress={() => router.back()}>
                    <Text style={s.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleSubmit = () => {
        if (isSlotTaken(slot.id)) {
            Alert.alert('Error', 'This slot is already booked');
            return;
        }

        const validation = validateBooking(name, reason, slot.timestamp);
        if (!validation.isValid) {
            Alert.alert('Validation Error', validation.error || 'Invalid input');
            return;
        }

        const success = addBooking({
            id: Date.now().toString(),
            slotId: slot.id,
            name: name.trim(),
            reason: reason.trim(),
            createdAt: Date.now(),
            slot,
        });

        if (!success) {
            Alert.alert('Error', 'Could not create booking');
            return;
        }

        Alert.alert('Success', 'Appointment booked successfully', [
            { text: 'OK', onPress: () => router.replace('/my-bookings') },
        ]);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={s.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={s.slotCard}>
                    <Text style={s.slotLabel}>Selected Appointment</Text>
                    <Text style={s.slotDate}>{slot.date}</Text>
                    <Text style={s.slotTime}>{slot.time}</Text>
                </View>

                <Text style={s.label}>Your Name</Text>
                <TextInput
                    style={[s.input, nameFocused && s.inputFocused]}
                    placeholder="Enter your full name"
                    placeholderTextColor={colors.placeholder}
                    value={name}
                    onChangeText={setName}
                    onFocus={() => setNameFocused(true)}
                    onBlur={() => setNameFocused(false)}
                    maxLength={50}
                />
                <Text style={s.charCount}>{name.length}/50</Text>

                <Text style={s.label}>Reason for Visit</Text>
                <TextInput
                    style={[s.input, s.textArea, reasonFocused && s.inputFocused]}
                    placeholder="Briefly describe the reason for your appointment"
                    placeholderTextColor={colors.placeholder}
                    value={reason}
                    onChangeText={setReason}
                    onFocus={() => setReasonFocused(true)}
                    onBlur={() => setReasonFocused(false)}
                    multiline
                    maxLength={200}
                />
                <Text style={s.charCount}>{reason.length}/200</Text>

                <TouchableOpacity
                    style={s.submitButton}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                >
                    <Text style={s.submitButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}