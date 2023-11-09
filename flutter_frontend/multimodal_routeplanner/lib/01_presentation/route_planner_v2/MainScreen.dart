import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/McubeLogo.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key, required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  /*ButtonStyle _getButtonStyle(BuildContext context, int index) {
    ColorScheme colorScheme = Theme.of(context).colorScheme;

    return navigationShell.currentIndex == index
        ? TextButton.styleFrom(backgroundColor: colorScheme.primaryContainer)
        : TextButton.styleFrom(backgroundColor: null);
  }*/

  TextStyle? _getTextStyle(BuildContext context, int index) {
    ColorScheme colorScheme = Theme.of(context).colorScheme;
    TextStyle? buttonTextStyle = Theme.of(context)
        .textTheme
        .headlineSmall
        ?.copyWith(color: colorScheme.onPrimary);

    TextStyle? buttonTextStyleSelected = Theme.of(context)
        .textTheme
        .headlineSmall
        ?.copyWith(
            color: colorScheme.onPrimary,
            decoration: TextDecoration.underline,
            decorationColor: Colors.white,
            decorationThickness: 2);

    return navigationShell.currentIndex == index
        ? buttonTextStyleSelected
        : buttonTextStyle;
  }

  Color _getBackgroundColor(BuildContext context) {
    ColorScheme colorScheme = Theme.of(context).colorScheme;
    return navigationShell.currentIndex == 0
        ? colorScheme.primary
        : colorScheme.background;
  }

  Color _getAppBarColor(BuildContext context) {
    ColorScheme colorScheme = Theme.of(context).colorScheme;
    return navigationShell.currentIndex == 0
        ? Colors.transparent
        : colorScheme.primary;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _getBackgroundColor(context),
      appBar: AppBar(
        toolbarHeight: 100,
        title: navigationRow(context),
        elevation: 0,
        backgroundColor: _getAppBarColor(context),
      ),
      extendBodyBehindAppBar: true,
      body: navigationShell,
    );
  }

  Widget navigationRow(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
      TextButton(
          //style: _getButtonStyle(context, 0),
          onPressed: () {
            context.goNamed('search-screen');
          },
          child: Text('Rechner', style: _getTextStyle(context, 0))),
      TextButton(
          //style: _getButtonStyle(context, 1),
          onPressed: () {
            context.goNamed('faq-screen');
          },
          child: Text('Informationen', style: _getTextStyle(context, 1))),
      TextButton(
          //style: _getButtonStyle(context, 2),
          onPressed: () {},
          child: Text('Über Uns', style: _getTextStyle(context, 2))),
      mcubeLogo(),
    ]);
  }
}

enum ContentType { calculator, info, aboutUs }
