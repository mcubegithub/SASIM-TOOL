import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/buttons.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/selection_mode.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/helpers/mode_to_x.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/detail_route_info/detail_route_info_content.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/result_content.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/costs_percentage_bar.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/costs_result_row.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/mobiscore_score_board/mobi_score_score_board.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/question_icons.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/Costs.dart';

class Layer1Content extends StatelessWidget {
  const Layer1Content(
      {super.key,
      required this.selectedTrip,
      required this.currentCarTrip,
      required this.currentBicycleTrip,
      required this.currentPublicTransportTrip,
      required this.setInfoViewTypeCallback,
      required this.setDiagramTypeCallback,
      required this.isMobile,
      required this.screenWidth,
      required this.contentMaxWidth,
      required this.changeLayerCallback,
      required this.onSelectionModeChanged});

  final Trip selectedTrip;
  final Trip? currentCarTrip;
  final Trip? currentBicycleTrip;
  final Trip? currentPublicTransportTrip;
  final Function(SelectionMode) onSelectionModeChanged;
  final Function(InfoViewType) setInfoViewTypeCallback;
  final Function(DiagramType) setDiagramTypeCallback;
  final bool isMobile;
  final double screenWidth;
  final double contentMaxWidth;
  final Function(ContentLayer) changeLayerCallback;

  @override
  Widget build(BuildContext context) {
    AppLocalizations lang = AppLocalizations.of(context)!;

    double horizontalPadding = largePadding;

    return SizedBox(
      width: contentMaxWidth + mediumPadding,
      child: Column(
        children: [
          largeVerticalSpacer,
          Padding(
            padding: EdgeInsets.only(left: mediumPadding, right: isMobile ? horizontalPadding : 0),
            child: Column(
              children: [
                layer1Header(context, selectedTrip.mode),
                isMobile ? largeVerticalSpacer : extraLargeVerticalSpacer,
                costsPercentageBar(context,
                    selectedTrip: selectedTrip, barType: CostsPercentageBarType.total, isMobile: isMobile),
                isMobile ? largeVerticalSpacer : extraLargeVerticalSpacer,
              ],
            ),
          ),
          if (isMobile)
            Padding(
              padding: EdgeInsets.only(left: mediumPadding),
              child: mobiScoreScoreBoardWithPointers(context,
                  heightSection: 240,
                  selectedTrip: selectedTrip,
                  currentCarTrip: currentCarTrip,
                  currentBicycleTrip: currentBicycleTrip,
                  currentPublicTransportTrip: currentPublicTransportTrip,
                  onSelectionModeChanged: onSelectionModeChanged,
                  horizontalPadding: horizontalPadding, onMobiscoreLogoPressed: () {
                setInfoViewTypeCallback(InfoViewType.mobiscore);
              }),
            ),
          Padding(
            padding: EdgeInsets.only(right: isMobile ? horizontalPadding : 0),
            child: costResultRow(context, trip: selectedTrip, setDiagramType: (value) {
              setInfoViewTypeCallback(InfoViewType.diagram);
              setDiagramTypeCallback(value);
            }, isMobile: isMobile, screenWidth: screenWidth),
          ),
          extraLargeVerticalSpacer,
          Padding(
            padding: EdgeInsets.only(left: mediumPadding, right: isMobile ? horizontalPadding : 0),
            child: V3CustomButton(
                label: lang.show_detailed_info,
                leadingIcon: Icons.bar_chart,
                onTap: () {
                  changeLayerCallback(ContentLayer.layer2details);
                }),
          ),
          extraLargeVerticalSpacer,
        ],
      ),
    );
  }

  SizedBox layer1Header(BuildContext context, String mode) {
    TextTheme textTheme = Theme.of(context).textTheme;
    AppLocalizations lang = AppLocalizations.of(context)!;
    return SizedBox(
      width: double.infinity,
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        spacing: mediumPadding,
        runSpacing: mediumPadding,
        children: [
          SizedBox(
              width: 700,
              child: Text('${lang.these_are_the_costs_of_your_journey_with} ${getModeNameWithArticle(context, mode)}',
                  style: isMobile ? textTheme.displaySmall : textTheme.displayMedium)),
          SizedBox(
            width: 200,
            child: Column(
              crossAxisAlignment: isMobile ? CrossAxisAlignment.start : CrossAxisAlignment.end,
              children: [
                Text(
                  selectedTrip.costs.getFullcosts().currencyString,
                  style: textTheme.displayLarge,
                ),
                Row(
                  mainAxisAlignment: isMobile ? MainAxisAlignment.start : MainAxisAlignment.end,
                  children: [
                    Text(lang.fullcosts_of_trip, style: textTheme.labelLarge),
                    smallHorizontalSpacer,
                    customQuestionIcon(onTap: () {
                      setInfoViewTypeCallback(InfoViewType.diagram);
                      setDiagramTypeCallback(DiagramType.total);
                    })
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
