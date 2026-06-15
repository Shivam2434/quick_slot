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
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: SPACING.xxl,
            backgroundColor: colors.background,
        },
        emptyIcon: {
            fontSize: 64,
            marginBottom: SPACING.lg,
        },
        emptyTitle: {
            fontSize: FONT_SIZES.xl,
            fontWeight: '700',
            color: colors.textPrimary,
            marginBottom: SPACING.sm,
        },
        emptyText: {
            fontSize: FONT_SIZES.md,
            color: colors.textMuted,
            marginBottom: SPACING.xxl,
            textAlign: 'center',
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SPACING.lg,
        },
        headerTitle: {
            fontSize: FONT_SIZES.xl,
            fontWeight: '700',
            color: colors.textPrimary,
        },
        countBadge: {
            backgroundColor: colors.primaryLight,
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.xs,
            borderRadius: BORDER_RADIUS.full,
        },
        countBadgeText: {
            fontSize: FONT_SIZES.xs,
            color: colors.primary,
            fontWeight: '600',
        },
        card: {
            backgroundColor: colors.card,
            padding: SPACING.lg,
            borderRadius: BORDER_RADIUS.lg,
            marginBottom: SPACING.md,
            borderLeftWidth: 4,
            borderLeftColor: colors.success,
            ...SHADOWS.small,
        },
        expiredCard: {
            borderLeftColor: colors.textMuted,
            opacity: 0.6,
        },
        cardHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: SPACING.sm,
        },
        time: {
            fontSize: FONT_SIZES.xl,
            fontWeight: '700',
            color: colors.textPrimary,
        },
        statusBadge: {
            paddingHorizontal: SPACING.md,
            paddingVertical: SPACING.xs,
            borderRadius: BORDER_RADIUS.full,
        },
        upcomingBadge: {
            backgroundColor: colors.successLight,
        },
        expiredBadge: {
            backgroundColor: colors.dangerLight,
        },
        upcomingBadgeText: {
            fontSize: FONT_SIZES.xs,
            color: colors.success,
            fontWeight: '600',
        },
        expiredBadgeText: {
            fontSize: FONT_SIZES.xs,
            color: colors.danger,
            fontWeight: '600',
        },
        date: {
            fontSize: FONT_SIZES.sm,
            color: colors.textSecondary,
            marginBottom: SPACING.sm,
        },
        divider: {
            height: 1,
            backgroundColor: colors.borderLight,
            marginVertical: SPACING.sm,
        },
        name: {
            fontSize: FONT_SIZES.md,
            fontWeight: '600',
            color: colors.textPrimary,
            marginBottom: SPACING.xs,
        },
        reason: {
            color: colors.textSecondary,
            fontSize: FONT_SIZES.sm,
            lineHeight: 20,
            marginBottom: SPACING.md,
        },
        cancelButton: {
            alignSelf: 'flex-start',
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.sm,
            borderRadius: BORDER_RADIUS.sm,
            borderWidth: 1.5,
            borderColor: colors.danger,
            backgroundColor: colors.dangerLight,
        },
        cancelText: {
            color: colors.danger,
            fontSize: FONT_SIZES.sm,
            fontWeight: '600',
        },
        button: {
            backgroundColor: colors.primary,
            paddingHorizontal: SPACING.xxl,
            paddingVertical: SPACING.lg,
            borderRadius: BORDER_RADIUS.md,
            ...SHADOWS.medium,
        },
        buttonText: {
            color: colors.textWhite,
            fontWeight: '700',
            fontSize: FONT_SIZES.md,
        },
    });