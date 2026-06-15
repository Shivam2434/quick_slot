import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeColors } from '../constants/theme';

export default function RootLayout() {
  const colors = useThemeColors();

  return (
    <>
      <StatusBar style={colors.statusBar === 'dark-content' ? 'dark' : 'light'} />
      <Stack
        screenOptions={{
          headerBackTitle: '',
          headerTintColor: colors.headerTint,
          headerStyle: {
            backgroundColor: colors.headerBackground,
          },
          headerTitleStyle: {
            fontWeight: '600',
            color: colors.headerText,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerBackTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="slots"
          options={{
            title: 'Available Slots',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="book"
          options={{
            title: 'Book Appointment',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="my-bookings"
          options={{
            title: 'My Bookings',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </>
  );
}