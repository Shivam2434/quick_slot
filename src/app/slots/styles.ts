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

        // Date Picker
        datePickerContainer: {
            backgroundColor: colors.card,
            borderRadius: BORDER_RADIUS.lg,
            padding: SPACING.lg,
            marginBottom: SPACING.lg,
            ...SHADOWS.medium,
        },
        datePickerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dateArrowButton: {
            padding: SPACING.sm,
            borderRadius: BORDER_RADIUS.md,
            backgroundColor: colors.primaryLight,
            width: 44,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
        },
        dateArrowDisabled: {
            backgroundColor: colors.disabled,
            opacity: 0.4,
        },
        dateArrowText: {
            fontSize: 18,
            color: colors.primary,
            fontWeight: 'bold',
        },
        dateTouchable: {
            alignItems: 'center',
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.xs,
        },
        dateSelectedText: {
            fontSize: FONT_SIZES.lg,
            fontWeight: '700',
            color: colors.textPrimary,
        },
        dateLabelText: {
            fontSize: FONT_SIZES.xs,
            color: colors.primary,
            fontWeight: '500',
            marginTop: 2,
        },
        todayBadge: {
            fontSize: FONT_SIZES.xs,
            color: colors.success,
            fontWeight: '600',
            marginTop: 2,
        },

        // Header
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SPACING.lg,
        },
        header: {
            fontSize: FONT_SIZES.xl,
            fontWeight: '700',
            color: colors.textPrimary,
        },
        availableBadge: {
            backgroundColor: colors.successLight,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.xs,
            borderRadius: BORDER_RADIUS.full,
        },
        availableBadgeText: {
            fontSize: FONT_SIZES.xs,
            color: colors.success,
            fontWeight: '600',
        },

        // Slots
        list: {
            paddingBottom: SPACING.xl,
        },
        slotCard: {
            backgroundColor: colors.card,
            padding: SPACING.lg,
            marginBottom: SPACING.sm,
            borderRadius: BORDER_RADIUS.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.border,
            ...SHADOWS.small,
        },
        slotDisabled: {
            backgroundColor: colors.disabled,
            borderColor: colors.borderLight,
            shadowOpacity: 0,
            elevation: 0,
        },
        timeText: {
            fontSize: FONT_SIZES.lg,
            fontWeight: '600',
            color: colors.textPrimary,
        },
        disabledText: {
            color: colors.disabledText,
        },
        available: {
            color: colors.primary,
            fontSize: FONT_SIZES.sm,
            fontWeight: '600',
        },
        badgeRedText: {
            color: colors.danger,
            fontSize: FONT_SIZES.sm,
            fontWeight: '700',
        },
        badgeGreyText: {
            color: colors.disabledText,
            fontSize: FONT_SIZES.sm,
            fontWeight: '500',
        },

        // Bottom Button
        button: {
            backgroundColor: colors.primary,
            padding: SPACING.lg,
            borderRadius: BORDER_RADIUS.xl,
            marginTop: SPACING.sm,
            ...SHADOWS.medium,
        },
        buttonText: {
            color: colors.textWhite,
            textAlign: 'center',
            fontWeight: '700',
            fontSize: FONT_SIZES.md,
        },

        // Empty
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 40,
        },
        emptyText: {
            fontSize: FONT_SIZES.md,
            color: colors.textMuted,
            textAlign: 'center',
        },
    });