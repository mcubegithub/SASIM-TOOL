/// Horizontal bar chart with bar label renderer example and hidden domain axis.
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/enums/DiagramTypeEnum.dart';

import 'DiagramHelper.dart';

class ResultDiagramBarWidget extends StatelessWidget {
  final List<Trip> trips;
  final bool animate;
  final DiagramTypeEnum diagramType;

  final DiagramHelper diagramHelper = DiagramHelper();

  ResultDiagramBarWidget({Key? key, required this.trips, this.animate = false, required this.diagramType})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return charts.BarChart(
      diagramHelper.createDiagramDataBar(trips: trips, diagramType: diagramType),
      animate: animate,
      vertical: false,
      // Set a bar label decorator.
      // Example configuring different styles for inside/outside:
      //       barRendererDecorator: new charts.BarLabelDecorator(
      //          insideLabelStyleSpec: new charts.TextStyleSpec(...),
      //          outsideLabelStyleSpec: new charts.TextStyleSpec(...)),
      barRendererDecorator: charts.BarLabelDecorator<String>(),
      // Hide domain axis.
      domainAxis: const charts.OrdinalAxisSpec(renderSpec: charts.NoneRenderSpec()),

      // here you can add some action, it a diagram bar is selected
      //example here is "show extra information of external costs"
      /*selectionModels: [
        charts.SelectionModelConfig(
          type: charts.SelectionModelType.info,
          changedListener: (model) {
            if (model.selectedDatum.first.index != null) {
              BlocProvider.of<CostDetailsBloc>(context).add(
                  ShowCostDetailsEvent(
                      costs: trips[model.selectedDatum.first.index!].costs));
            }
          },
        ),
      ],*/
    );
  }
}
