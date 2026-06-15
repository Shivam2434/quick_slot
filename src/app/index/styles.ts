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
            backgroundColor: colors.welcomeBackground,
        },
        topSection: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: SPACING.xxxl,
        },
        iconCircle: {
            width: 110,
            height: 110,
            borderRadius: 55,
            backgroundColor: colors.welcomeOverlay,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: SPACING.xxl,
            borderWidth: 2,
            borderColor: colors.welcomeOverlayBorder,
        },
        iconText: {
            fontSize: 52,
        },
        title: {
            fontSize: 36,
            fontWeight: '800',
            color: colors.welcomeText,
            textAlign: 'center',
            marginBottom: SPACING.sm,
            letterSpacing: 0.5,
        },
        subtitle: {
            fontSize: FONT_SIZES.md,
            color: colors.welcomeSubtext,
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: SPACING.lg,
        },
        featureRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 40,
            width: '100%',
        },
        featureItem: {
            alignItems: 'center',
            gap: SPACING.sm,
        },
        featureIconCircle: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.welcomeOverlay,
            justifyContent: 'center',
            alignItems: 'center',
        },
        featureIcon: {
            fontSize: 22,
        },
        featureText: {
            color: colors.welcomeSubtext,
            fontSize: FONT_SIZES.xs,
            fontWeight: '600',
        },
        bottomSection: {
            paddingHorizontal: SPACING.xxl,
            paddingBottom: 52,
            gap: SPACING.md,
        },
        primaryButton: {
            backgroundColor: colors.welcomeButtonBg,
            padding: SPACING.xl,
            borderRadius: BORDER_RADIUS.lg,
            alignItems: 'center',
            ...SHADOWS.large,
        },
        primaryButtonText: {
            color: colors.welcomeButtonText,
            fontSize: FONT_SIZES.lg,
            fontWeight: '700',
        },
        secondaryButton: {
            backgroundColor: colors.welcomeSecondaryBg,
            padding: SPACING.xl,
            borderRadius: BORDER_RADIUS.lg,
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: colors.welcomeSecondaryBorder,
        },
        secondaryButtonText: {
            color: colors.welcomeSecondaryText,
            fontSize: FONT_SIZES.md,
            fontWeight: '600',
        },
        bookingCount: {
            color: colors.welcomeSubtext,
            fontSize: FONT_SIZES.xs,
            marginTop: SPACING.xs,
        },
    });