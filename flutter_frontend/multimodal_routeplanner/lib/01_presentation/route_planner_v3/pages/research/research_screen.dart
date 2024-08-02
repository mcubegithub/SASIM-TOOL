import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/mobile_scaffold_widgets.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/nav_drawer.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/research/research_content.dart';
import 'package:multimodal_routeplanner/01_presentation/theme_data/colors_v3.dart';

class ResearchScreen extends StatelessWidget {
  const ResearchScreen({super.key});

  static const String routeName = 'research';
  static const String path = 'research';

  @override
  Widget build(BuildContext context) {
    GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();

    double screenWidth = MediaQuery.of(context).size.width;
    bool isMobile = screenWidth < 600;

    return Scaffold(
        backgroundColor: backgroundColorYellowV3,
        key: scaffoldKey,
        appBar: isMobile ? mobileAppBar(scaffoldKey) : null,
        drawer: buildDrawer(context),
        body: ResearchContent(
          isMobile: isMobile,
        ));
  }
}
