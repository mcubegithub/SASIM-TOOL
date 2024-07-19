import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/commons/buttons.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/result_content.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/costs_percentage_bar.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/detail_route_info/detail_route_info_section.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/layer_2_detailed/costs_card_layer_2.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/layer_2_detailed/costs_details_card_layer_2.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/Costs.dart';

class Layer2Content extends StatelessWidget {
  const Layer2Content(
      {super.key,
      required this.selectedTrip,
      required this.isMobile,
      required this.setInfoViewTypeCallback,
      required this.setDiagramTypeCallback,
      required this.contentMaxWidth,
      required this.changeLayerCallback});

  final Trip selectedTrip;
  final bool isMobile;
  final Function(InfoViewType) setInfoViewTypeCallback;
  final Function(DiagramType) setDiagramTypeCallback;
  final Function(ContentLayer) changeLayerCallback;
  final double contentMaxWidth;

  @override
  Widget build(BuildContext context) {
    double heightImage = isMobile ? 200 : 240;
    double height = 150;
    return SizedBox(
      width: contentMaxWidth,
      child: Column(
        children: [
          mediumVerticalSpacer,
          v3CustomButton(
              label: 'Back to Route Results',
              leadingIcon: Icons.arrow_back,
              onTap: () {
                changeLayerCallback(ContentLayer.layer1);
              }),
          largeVerticalSpacer,
          Wrap(
            alignment: isMobile ? WrapAlignment.center : WrapAlignment.spaceBetween,
            spacing: largePadding,
            runSpacing: largePadding,
            children: [
              resultColumnLayer2(context,
                  costsType: CostsType.social,
                  height: height,
                  heightImage: heightImage,
                  trip: selectedTrip,
                  barType: CostsPercentageBarType.social,
                  isMobile: isMobile),
              resultColumnLayer2(context,
                  costsType: CostsType.personal,
                  height: height,
                  heightImage: heightImage,
                  trip: selectedTrip,
                  barType: CostsPercentageBarType.personal,
                  isMobile: isMobile),
            ],
          ),
          extraLargeVerticalSpacer,
          v3CustomButton(label: 'Share or Leave a Feedback', leadingIcon: Icons.share, onTap: () {}),
          extraLargeVerticalSpacer
        ],
      ),
    );
  }
}

Widget resultColumnLayer2(BuildContext context,
    {required CostsType costsType,
    required double height,
    required heightImage,
    required Trip trip,
    required CostsPercentageBarType barType,
    required bool isMobile}) {
  return SizedBox(
    width: 400,
    child: Column(
      children: [
        costsCardLayer2(context,
            costsType: costsType, height: height, heightImage: heightImage, trip: trip, isMobile: isMobile),
        mediumVerticalSpacer,
        costsPercentageBar(context, selectedTrip: trip, barType: barType),
        mediumVerticalSpacer,
        costsDetailsCardLayer2(context, selectedTrip: trip, costsType: costsType, isMobile: isMobile),
      ],
    ),
  );
}
