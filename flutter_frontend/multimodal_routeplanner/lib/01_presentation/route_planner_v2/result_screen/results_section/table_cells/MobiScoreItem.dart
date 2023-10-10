import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/helpers/ModeMapingHelper.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/result_screen/results_section/table_cells/CustomAnimatedTableCell.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';

class MobiScoreItem extends StatelessWidget {
  const MobiScoreItem(
      {super.key,
      required this.selectedTrip,
      required this.animationController,
      required this.animation});

  final Trip selectedTrip;
  final AnimationController animationController;
  final Animation animation;

  @override
  Widget build(BuildContext context) {
    ModeMappingHelper stringMappingHelper = ModeMappingHelper();

    return CustomAnimatedTableCell(
      animation: animation,
      animationController: animationController,
      selectedTrip: selectedTrip,
      child: SizedBox(
        width: 100,
        height: 50,
        child: Image(
          image: stringMappingHelper
              .mapMobiScoreStringToPath(selectedTrip.mobiScore),
        ),
      ),
    );
  }
}
