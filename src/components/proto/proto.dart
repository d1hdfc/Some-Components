import 'package:flutter/material.dart';

enum UIProtoVariant { primary, secondary, tertiary, outlined }
enum UIProtoSize { small, medium, large }

/// Auto-generated Flutter widget for [Proto] from Figma.
class UIProto extends StatelessWidget {
  final String label;
  final Widget? child;
  final VoidCallback? onPressed;
  final UIProtoVariant variant;
  final UIProtoSize size;
  final bool isDisabled;
  final bool isLoading;
  final bool isFullWidth;
  final Widget? leadingIcon;
  final Widget? trailingIcon;

  const UIProto({
    Key? key,
    this.label = '12:30',
    this.child,
    this.onPressed,
    this.variant = UIProtoVariant.primary,
    this.size = UIProtoSize.small,
    this.isDisabled = false,
    this.isLoading = false,
    this.isFullWidth = false,
    this.leadingIcon,
    this.trailingIcon,
  }) : super(key: key);

  EdgeInsets _getPadding() {
    switch (size) {
      case UIProtoSize.small:
        return const EdgeInsets.symmetric(horizontal: 8, vertical: 4);
      case UIProtoSize.large:
        return const EdgeInsets.symmetric(horizontal: 0, vertical: 0);
      case UIProtoSize.medium:
      default:
        return const EdgeInsets.symmetric(horizontal: 0.0, vertical: 0.0);
    }
  }

  Color _getBackgroundColor(BuildContext context) {
    if (variant == UIProtoVariant.primary) {
      return const Color(0xFF0C2340);
    }
    return Colors.transparent;
  }

  Color _getTextColor(BuildContext context) {
    if (variant == UIProtoVariant.primary) {
      return Colors.white;
    }
    return const Color(0xFF0C2340);
  }

  BorderSide _getBorderSide(BuildContext context) {
    if (variant == UIProtoVariant.secondary) {
      return const BorderSide(color: Color(0xFFD1D5DB), width: 1.0);
    }
    if (variant == UIProtoVariant.outlined) {
      return const BorderSide(color: Color(0xFF0C2340), width: 1.5);
    }
    return BorderSide.none;
  }

  @override
  Widget build(BuildContext context) {
    final effectiveEnabled = !isDisabled && !isLoading;
    final content = Row(
      mainAxisSize: isFullWidth ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (isLoading)
          const Padding(
            padding: EdgeInsets.only(right: 8.0),
            child: SizedBox(
              width: 16,
              height: 16,
              child: CircularProgressIndicator(strokeWidth: 2.0),
            ),
          )
        else if (leadingIcon != null)
          Padding(
            padding: const EdgeInsets.only(right: 6.0),
            child: leadingIcon!,
          ),
        child ??
            Text(
              label,
              style: TextStyle(
                color: _getTextColor(context),
                fontWeight: FontWeight.w600,
              ),
            ),
        if (trailingIcon != null && !isLoading)
          Padding(
            padding: const EdgeInsets.only(left: 6.0),
            child: trailingIcon!,
          ),
      ],
    );

    return Opacity(
      opacity: effectiveEnabled ? 1.0 : 0.5,
      child: Material(
        color: _getBackgroundColor(context),
        borderRadius: BorderRadius.circular(0.0),
        child: InkWell(
          onTap: effectiveEnabled ? onPressed : null,
          borderRadius: BorderRadius.circular(0.0),
          child: Container(
            padding: _getPadding(),
            decoration: BoxDecoration(
              border: Border.fromBorderSide(_getBorderSide(context)),
              borderRadius: BorderRadius.circular(0.0),
            ),
            child: content,
          ),
        ),
      ),
    );
  }
}
