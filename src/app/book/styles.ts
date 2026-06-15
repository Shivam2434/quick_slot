import { StyleSheet } from 'react-native';
import {
    BORDER_RADIUS,
    FONT_SIZES,
    SHADOWS,
    SPACING,
    ThemeColors,
} from '../../constants/theme';

export const getStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: SPACING.lg,
            backgroundColor: colors.background,
        },
        slotCard: {
            backgroundColor: colors.card,
            padding: SPACING.xl,
            borderRadius: BORDER_RADIUS.lg,
            marginBottom: SPACING.xxl,
            borderLeftWidth: 4,
            borderLeftColor: colors.primary,
            ...SHADOWS.medium,
        },
        slotLabel: {
            fontSize: FONT_SIZES.xs,
            color: colors.textMuted,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: SPACING.sm,
        },
        slotDate: {
            fontSize: FONT_SIZES.md,
            color: colors.textSecondary,
            marginBottom: SPACING.xs,
        },
        slotTime: {
            fontSize: FONT_SIZES.xxl,
            fontWeight: '700',
            color: colors.textPrimary,
        },
        label: {
            fontSize: FONT_SIZES.sm,
            color: colors.textSecondary,
            fontWeight: '600',
            marginBottom: SPACING.sm,
            marginTop: SPACING.lg,
        },
        input: {
            backgroundColor: colors.inputBackground,
            padding: SPACING.lg,
            borderRadius: BORDER_RADIUS.md,
            borderWidth: 1.5,
            borderColor: colors.inputBorder,
            fontSize: FONT_SIZES.md,
            color: colors.textPrimary,
        },
        inputFocused: {
            borderColor: colors.inputBorderFocused,
        },
        textArea: {
            height: 110,
            textAlignVertical: 'top',
        },
        charCount: {
            fontSize: FONT_SIZES.xs,
            color: colors.textMuted,
            textAlign: 'right',
            marginTop: SPACING.xs,
        },
        submitButton: {
            backgroundColor: colors.primary,
            padding: SPACING.xl,
            borderRadius: BORDER_RADIUS.md,
            marginTop: SPACING.xxxl,
            ...SHADOWS.medium,
        },
        submitButtonText: {
            color: colors.textWhite,
            textAlign: 'center',
            fontWeight: '700',
            fontSize: FONT_SIZES.lg,
        },
        errorText: {
            fontSize: FONT_SIZES.md,
            color: colors.danger,
            marginBottom: SPACING.lg,
            textAlign: 'center',
        },
        backButton: {
            backgroundColor: colors.primary,
            padding: SPACING.lg,
            borderRadius: BORDER_RADIUS.md,
        },
        backButtonText: {
            color: colors.textWhite,
            textAlign: 'center',
            fontWeight: '700',
        },
    });