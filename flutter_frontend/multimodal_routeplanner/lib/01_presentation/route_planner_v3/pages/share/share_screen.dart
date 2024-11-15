import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/share/share_content.dart';
import 'package:multimodal_routeplanner/01_presentation/values/dimensions.dart';

class ShareScreen extends StatelessWidget {
  const ShareScreen(
      {super.key, required this.startAddress, required this.endAddress, this.startCoordinates, this.endCoordinates});

  static const String routeName = 'share';
  static const String path = 'share';

  final String startAddress;
  final String endAddress;
  final String? startCoordinates;
  final String? endCoordinates;

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    bool isMobile = screenWidth < mobileScreenWidthMinimum;

    return ShareContent(
      isMobile: isMobile,
      startAddress: startAddress,
      startCoordinates: startCoordinates,
      endAddress: endAddress,
      endCoordinates: endCoordinates,
    );
  }
}
