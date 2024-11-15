import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/commons/mode_colors.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/legend/LegendRow.dart';

class Legend extends StatelessWidget {
  const Legend({super.key});

  @override
  Widget build(BuildContext context) {
    final values = ModeColors();
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.all(Radius.circular(5)),
            color: Colors.grey.withOpacity(0.8),
          ),
          child: Wrap(
            direction: Axis.vertical,
            children: [
              LegendRow(modeString: "zu Fuß", color: values.walkColor),
              LegendRow(
                modeString: "Fahrrad",
                color: values.bikeColor,
              ),
              LegendRow(
                modeString: "U-Bahn",
                color: values.metroColor,
              ),
              LegendRow(
                modeString: "Bus",
                color: values.busColor,
              ),
              LegendRow(
                modeString: "Tram",
                color: values.tramColor,
              ),
              LegendRow(
                modeString: "S-Bahn",
                color: values.trainColor,
              ),
            ],
          )),
    );
  }
}
