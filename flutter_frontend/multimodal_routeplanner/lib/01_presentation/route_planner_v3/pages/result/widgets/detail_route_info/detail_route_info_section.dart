import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/detail_route_info/detail_route_info_diagram.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/detail_route_info/detail_route_info_map.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/pages/result/widgets/detail_route_info/diagram_type_selection.dart';
import 'package:multimodal_routeplanner/01_presentation/theme_data/colors_v3.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';

class DetailRouteInfoSection extends StatelessWidget {
  const DetailRouteInfoSection({
    super.key,
    this.isMobile = false,
    this.currentCarTrip,
    this.currentBicycleTrip,
    this.currentPublicTransportTrip,
    this.selectedTrip,
    required this.infoViewType,
    required this.selectedDiagramType,
    required this.setInfoViewTypeCallback,
    required this.setDiagramTypeCallback,
    this.closeCallback,
  });

  final bool isMobile;
  final Trip? currentCarTrip;
  final Trip? currentBicycleTrip;
  final Trip? currentPublicTransportTrip;
  final Trip? selectedTrip;
  final InfoViewType infoViewType;
  final DiagramType selectedDiagramType;
  final Function(InfoViewType) setInfoViewTypeCallback;
  final Function(DiagramType) setDiagramTypeCallback;
  final Function()? closeCallback;

  void changeInfoViewType() {
    if (infoViewType == InfoViewType.diagram) {
      setInfoViewTypeCallback(InfoViewType.map);
    } else {
      setInfoViewTypeCallback(InfoViewType.diagram);
    }
  }

  @override
  Widget build(BuildContext context) {
    double diagramTypeSelectionHeight = 80;
    TextTheme textTheme = Theme.of(context).textTheme;
    return Container(
      decoration: BoxDecoration(
        color: backgroundColorV3,
      ),
      width: isMobile ? double.infinity : 350,
      height: double.infinity,
      child: Stack(
        fit: StackFit.expand,
        children: [
          if (infoViewType == InfoViewType.map) DetailRouteInfoMap(trip: selectedTrip),
          Padding(
            padding: EdgeInsets.all(largePadding),
            child: Column(children: [
              Align(
                alignment: Alignment.centerRight,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    if (isMobile == true)
                      CircleAvatar(
                        backgroundColor: Colors.white,
                        child: IconButton(
                          icon: Icon(Icons.close, color: colorE),
                          onPressed: () {
                            if (closeCallback != null) {
                              closeCallback!();
                            }
                          },
                        ),
                      )
                    else
                      const SizedBox(),
                    Row(children: [
                      Text('Diagramm', style: textTheme.titleSmall!.copyWith(color: Colors.black)),
                      Switch(
                        value: (infoViewType == InfoViewType.diagram),
                        onChanged: (value) {
                          changeInfoViewType();
                        },
                        activeColor: secondaryColorV3,
                        inactiveThumbColor: Colors.grey,
                      ),
                    ])
                  ],
                ),
              ),
              extraLargeVerticalSpacer,
              if (infoViewType == InfoViewType.diagram) ...[
                DiagramTypeSelection(
                  height: diagramTypeSelectionHeight,
                  setDiagramType: (DiagramType value) {
                    setDiagramTypeCallback(value);
                  },
                  selectedDiagramType: selectedDiagramType,
                ),
                extraLargeVerticalSpacer,
                DetailRouteInfoDiagram(
                    currentCarTrip: currentCarTrip,
                    currentBicycleTrip: currentBicycleTrip,
                    currentPublicTransportTrip: currentPublicTransportTrip,
                    selectedDiagramType: selectedDiagramType)
              ]
            ]),
          ),
        ],
      ),
    );
  }
}

enum InfoViewType { diagram, map }

enum DiagramType { total, social, personal }