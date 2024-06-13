import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/selection_mode.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/result/widgets/costs_result_row.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/result/widgets/question_icons.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/search/widgets/mode_selection_components.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/Costs.dart';

class ResultContent extends StatelessWidget {
  const ResultContent({
    super.key,
    this.isMobile = false,
    required this.selectionMode,
    required this.isElectric,
    required this.isShared,
    required this.trips,
    required this.selectedTrip,
    required this.onSelectionModeChanged,
    required this.onElectricChanged,
    required this.onSharedChanged,
  });

  final bool isMobile;
  final SelectionMode selectionMode;
  final bool isElectric;
  final bool isShared;
  final List<Trip> trips;
  final Trip selectedTrip;
  final Function(SelectionMode) onSelectionModeChanged;
  final Function(bool) onElectricChanged;
  final Function(bool) onSharedChanged;

  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return Align(
      alignment: Alignment.topCenter,
      child: SizedBox(
        width: 1000,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            extraLargeVerticalSpacer,
            Padding(
              padding: EdgeInsets.symmetric(horizontal: mediumPadding),
              child: modeSelectionRow(context,
                  isElectric: isElectric,
                  onElectricChanged: onElectricChanged,
                  selectionMode: selectionMode,
                  onSelectionModeChanged: onSelectionModeChanged,
                  isShared: isShared,
                  onSharedChanged: onSharedChanged),
            ),
            extraLargeVerticalSpacer,
            largeVerticalSpacer,
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              // TODO: change text to custom text
              children: [
                SizedBox(
                    width: 500,
                    child: Text('These are the real costs of mobility with a private car',
                        style: textTheme.displayMedium)),
                SizedBox(
                  width: 200,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        selectedTrip.costs.getFullcosts().currencyString,
                        style: textTheme.displayLarge,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('Full cost of the trip', style: textTheme.labelLarge),
                          smallHorizontalSpacer,
                          customQuestionIcon()
                        ],
                      )
                    ],
                  ),
                )
              ],
            ),
            extraLargeVerticalSpacer,
            costResultRow(context, trip: selectedTrip),
          ],
        ),
      ),
    );
  }
}
