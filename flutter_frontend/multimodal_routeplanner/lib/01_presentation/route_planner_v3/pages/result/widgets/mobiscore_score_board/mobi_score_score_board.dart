import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/selection_mode.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/helpers/input_to_trip.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/mobiscore_score_board/score_pointer.dart';
import 'package:multimodal_routeplanner/01_presentation/theme_data/colors_v3.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';

double widthScoreColumn = 44;
double heightScoreColumn = 400;
double borderWidthScoreColumn = 6;

Widget mobiScoreScoreBoard(BuildContext context, {required Trip selectedTrip, bool isMobile = false}) {
  return Container(
    decoration: BoxDecoration(
      color: backgroundColorGreyV3,
      borderRadius: BorderRadius.circular(30),
      border: Border.all(color: Colors.white, width: borderWidthScoreColumn),
    ),
    width: !isMobile ? widthScoreColumn : double.infinity,
    height: !isMobile ? heightScoreColumn : widthScoreColumn,
    child: !isMobile
        ? Column(
            children: _listScoreSections(context, selectedTrip: selectedTrip, isMobile: isMobile),
          )
        : Row(
            children: _listScoreSections(context, selectedTrip: selectedTrip, isMobile: isMobile),
          ),
  );
}

Widget mobiScoreScoreBoardWithPointers(BuildContext context,
    {required double heightSection,
    required Trip selectedTrip,
    required Trip? currentCarTrip,
    required Trip? currentBicycleTrip,
    required Trip? currentPublicTransportTrip,
    required Function(SelectionMode) onSelectionModeChanged,
    double horizontalPadding = 0}) {
  // get screen width
  double screenWidth = MediaQuery.of(context).size.width;

  //necessary, because often bicycle and pt have same mobiscore
  bool isBicyclePointerReversed = isBicycleReversed(currentBicycleTrip, currentPublicTransportTrip, selectedTrip);

  return SizedBox(
    height: heightSection,
    child: Stack(
      children: [
        Align(
            alignment: Alignment.centerLeft,
            child: mobiScoreScoreBoard(context, selectedTrip: selectedTrip, isMobile: true)),
        if (currentCarTrip != null)
          positionedScorePointer(
            widthScoreColumn: widthScoreColumn,
            heightScoreColumn: heightScoreColumn,
            borderWidthScoreColumn: borderWidthScoreColumn,
            selectedTrip: selectedTrip,
            thisTrip: currentCarTrip,
            heightSection: heightSection,
            screenWidth: screenWidth,
            horizontalPadding: horizontalPadding,
            isMobile: true,
            onTripSelected: (value) {
              SelectionMode mode = getSelectionModeFromTripMode(value.mode);
              onSelectionModeChanged(mode);
            },
          ),
        if (currentBicycleTrip != null)
          positionedScorePointer(
            widthScoreColumn: widthScoreColumn,
            heightScoreColumn: heightScoreColumn,
            borderWidthScoreColumn: borderWidthScoreColumn,
            selectedTrip: selectedTrip,
            thisTrip: currentBicycleTrip,
            heightSection: heightSection,
            screenWidth: screenWidth,
            horizontalPadding: horizontalPadding,
            isMobile: true,
            isReversed: isBicyclePointerReversed,
            onTripSelected: (value) {
              SelectionMode mode = getSelectionModeFromTripMode(value.mode);
              onSelectionModeChanged(mode);
            },
          ),
        if (currentPublicTransportTrip != null)
          positionedScorePointer(
            widthScoreColumn: widthScoreColumn,
            heightScoreColumn: heightScoreColumn,
            borderWidthScoreColumn: borderWidthScoreColumn,
            selectedTrip: selectedTrip,
            thisTrip: currentPublicTransportTrip,
            heightSection: heightSection,
            screenWidth: screenWidth,
            horizontalPadding: horizontalPadding,
            isMobile: true,
            onTripSelected: (value) {
              SelectionMode mode = getSelectionModeFromTripMode(value.mode);
              onSelectionModeChanged(mode);
            },
          ),
      ],
    ),
  );
}

List<Widget> _listScoreSections(BuildContext context, {required Trip selectedTrip, required bool isMobile}) {
  return [
    _scoreSection(context,
        selectedTrip: selectedTrip, letter: 'A', color: colorA, isFirst: true, isLast: false, isMobile: isMobile),
    _scoreSection(context,
        selectedTrip: selectedTrip, letter: 'B', color: colorB, isFirst: false, isLast: false, isMobile: isMobile),
    _scoreSection(context,
        selectedTrip: selectedTrip, letter: 'C', color: colorC, isFirst: false, isLast: false, isMobile: isMobile),
    _scoreSection(context,
        selectedTrip: selectedTrip, letter: 'D', color: colorD, isFirst: false, isLast: false, isMobile: isMobile),
    _scoreSection(context,
        selectedTrip: selectedTrip, letter: 'E', color: colorE, isFirst: false, isLast: true, isMobile: isMobile),
  ];
}

Expanded _scoreSection(BuildContext context,
    {required Trip selectedTrip,
    required String letter,
    required Color color,
    isFirst = false,
    isLast = false,
    required bool isMobile}) {
  TextTheme textTheme = Theme.of(context).textTheme;

  return Expanded(
    child: Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
            topLeft: (isFirst) ? const Radius.circular(30) : const Radius.circular(0),
            topRight:
                (isFirst && !isMobile || isLast && isMobile) ? const Radius.circular(30) : const Radius.circular(0),
            bottomLeft:
                (isFirst && isMobile || isLast && !isMobile) ? const Radius.circular(30) : const Radius.circular(0),
            bottomRight: (isLast) ? const Radius.circular(30) : const Radius.circular(0)),
        color: (selectedTrip.mobiScore == letter) ? color : backgroundColorGreyV3,
      ),
      child: Center(
        child: Text(
          letter,
          style: textTheme.headlineSmall!.copyWith(fontWeight: FontWeight.bold),
        ),
      ),
    ),
  );
}

List<Widget> scoreBoardWithPointers(BuildContext context,
    {required double widthInfoSection,
    required double screenHeight,
    required Trip selectedTrip,
    required Trip? currentCarTrip,
    required Trip? currentPublicTransportTrip,
    required Trip? currentBicycleTrip,
    required Function(SelectionMode) onSelectionModeChanged}) {
  return [
    Positioned(
      right: widthInfoSection - (widthScoreColumn / 2),
      top: (screenHeight - heightScoreColumn) / 2 - mediumPadding - widthScoreColumn,
      child: CircleAvatar(
        backgroundColor: Colors.white,
        child: Padding(
          padding: EdgeInsets.all(smallPadding),
          child: Image.asset(
            'assets/mobiscore_logos/logo_primary.png',
            height: widthScoreColumn,
            width: widthScoreColumn,
          ),
        ),
      ),
    ),
    Positioned(
      right: widthInfoSection - (widthScoreColumn / 2),
      bottom: (screenHeight - heightScoreColumn) / 2,
      child: mobiScoreScoreBoard(context, selectedTrip: selectedTrip),
    ),
    ...positionedScorePointers(
        widthInfoSection: widthInfoSection,
        widthScoreColumn: widthScoreColumn,
        heightScoreColumn: heightScoreColumn,
        borderWidthScoreColumn: borderWidthScoreColumn,
        screenHeight: screenHeight,
        selectedTrip: selectedTrip,
        currentCarTrip: currentCarTrip,
        currentPublicTransportTrip: currentPublicTransportTrip,
        currentBicycleTrip: currentBicycleTrip,
        onSelectionModeChanged: onSelectionModeChanged),
  ];
}

List<Widget> positionedScorePointers(
    {required double widthInfoSection,
    required double widthScoreColumn,
    required double heightScoreColumn,
    required double borderWidthScoreColumn,
    required double screenHeight,
    required Trip selectedTrip,
    required Trip? currentCarTrip,
    required Trip? currentPublicTransportTrip,
    required Trip? currentBicycleTrip,
    bool isMobile = false,
    double mobileTopPositionOffset = 0,
    required Function(SelectionMode) onSelectionModeChanged}) {
  //necessary, because often bicycle and pt have same mobiscore
  bool bikePointerReversed = isBicycleReversed(currentBicycleTrip, currentPublicTransportTrip, selectedTrip);
  return [
    if (currentCarTrip != null)
      positionedScorePointer(
        widthInfoSection: widthInfoSection,
        widthScoreColumn: widthScoreColumn,
        heightScoreColumn: heightScoreColumn,
        borderWidthScoreColumn: borderWidthScoreColumn,
        screenHeight: screenHeight,
        selectedTrip: selectedTrip,
        thisTrip: currentCarTrip,
        isMobile: isMobile,
        onTripSelected: (value) {
          SelectionMode mode = getSelectionModeFromTripMode(value.mode);
          onSelectionModeChanged(mode);
        },
      ),
    if (currentPublicTransportTrip != null)
      positionedScorePointer(
        widthInfoSection: widthInfoSection,
        widthScoreColumn: widthScoreColumn,
        heightScoreColumn: heightScoreColumn,
        borderWidthScoreColumn: borderWidthScoreColumn,
        screenHeight: screenHeight,
        selectedTrip: selectedTrip,
        thisTrip: currentPublicTransportTrip,
        isMobile: isMobile,
        onTripSelected: (value) {
          SelectionMode mode = getSelectionModeFromTripMode(value.mode);
          onSelectionModeChanged(mode);
        },
      ),
    if (currentBicycleTrip != null)
      positionedScorePointer(
        widthInfoSection: widthInfoSection,
        widthScoreColumn: widthScoreColumn,
        heightScoreColumn: heightScoreColumn,
        borderWidthScoreColumn: borderWidthScoreColumn,
        screenHeight: screenHeight,
        selectedTrip: selectedTrip,
        thisTrip: currentBicycleTrip,
        isMobile: isMobile,
        isReversed: bikePointerReversed,
        onTripSelected: (value) {
          SelectionMode mode = getSelectionModeFromTripMode(value.mode);
          onSelectionModeChanged(mode);
        },
      ),
  ];
}

bool isBicycleReversed(Trip? currentBicycleTrip, Trip? currentPublicTransportTrip, Trip? selectedTrip) {
  if (currentBicycleTrip != null && currentPublicTransportTrip != null && selectedTrip != null) {
    if (currentBicycleTrip.mobiScore == currentPublicTransportTrip.mobiScore && selectedTrip.mode != 'PT') {
      return true;
    }
  }
  return false;
}
