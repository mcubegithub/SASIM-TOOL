import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/headers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/fullcost_calculator/result_screen/results_section/ResultTable.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/fullcost_calculator/result_screen/results_section/general_result_diagram/ExternalCostsDiagram.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';

class ResultSection extends StatefulWidget {
  const ResultSection({
    super.key,
    required this.listTrips,
  });

  final List<Trip> listTrips;

  @override
  State<ResultSection> createState() => _ResultSectionState();
}

class _ResultSectionState extends State<ResultSection> {
  late Trip trip1;
  late Trip trip2;
  late Trip trip3;

  @override
  void initState() {
    super.initState();
    trip1 = widget.listTrips[0];
    trip2 = widget.listTrips[1];
    trip3 = widget.listTrips[2];
  }

  void updateTrip1(Trip trip) {
    setState(() {
      trip1 = trip;
    });
  }

  void updateTrip2(Trip trip) {
    setState(() {
      trip2 = trip;
    });
  }

  void updateTrip3(Trip trip) {
    setState(() {
      trip3 = trip;
    });
  }

  @override
  Widget build(BuildContext context) {
    var externalCostsKey = GlobalKey();
    var mobiScoreKey = GlobalKey();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        mediumVerticalSpacer,
        ResultTable(
          listTrips: widget.listTrips,
          onTrip1ChangedCallback: updateTrip1,
          onTrip2ChangedCallback: updateTrip2,
          onTrip3ChangedCallback: updateTrip3,
          externalCostsInfoCallback: () {
            scrollTo(externalCostsKey);
          },
          mobiscoreInfoCallbacK: () {
            scrollTo(mobiScoreKey);
          },
        ),
        extraLargeVerticalSpacer,
        TitleImage(
            key: externalCostsKey,
            imagePath: 'assets/title_image/titelbild_ubahn.png',
            titleText: 'Das sind die externen Kosten deiner Route',
            height: 200),
        extraLargeVerticalSpacer,
        ExternalCostsDiagram(
          trip1: trip1,
          trip2: trip2,
          trip3: trip3,
        ),
        extraLargeVerticalSpacer,
        TitleImage(
            key: mobiScoreKey,
            imagePath: 'assets/title_image/titelbild_ubahn.png',
            titleText: 'Was ist der Mobi-Score?',
            height: 200),
        extraLargeVerticalSpacer,
      ],
    );
  }

  void scrollTo(GlobalKey<State<StatefulWidget>> externalCostsKey) {
    Scrollable.ensureVisible(externalCostsKey.currentContext!,
        duration: const Duration(milliseconds: 500), curve: Curves.easeInOut);
  }
}
