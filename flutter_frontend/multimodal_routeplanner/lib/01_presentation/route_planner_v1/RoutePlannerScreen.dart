import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/map/MapWidget.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/route_info/RouteInfo.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/TitleWidget.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/mode_input/ModeInputField.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/mode_input/ResetRouteButton.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/result_list/ResultListError.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/result_list/ResultListSuccessfull.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v1/widgets/search_page/text_input/AdvancedSearchInput.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/fullcost_calculator/search_screen/SearchScreen.dart';
import 'package:multimodal_routeplanner/02_application/bloc/route_info/route_info_bloc.dart';
import 'package:multimodal_routeplanner/02_application/bloc/route_planner/advanced_route_planner_bloc.dart';
import 'package:multimodal_routeplanner/02_application/bloc/visualization/visualization_bloc.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/config/setup_dependencies.dart';

class RoutePlannerScreen extends StatelessWidget {
  const RoutePlannerScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final themeData = Theme.of(context);

    String startAddress = "Arcisstraße 21, München";
    String endAddress = "Schleißheimerstr. 318, München";

    AdvancedRoutePlannerBloc routeBlocProvider = sl<AdvancedRoutePlannerBloc>();

    Map<String, Trip> selectedTrips = {};
    List<Trip> listSelectedTrips = [];

    Map<String, Trip> savedTrips = {};

    return Scaffold(
      body: Stack(
        children: [
          const MapContent(),
          Row(children: [
            Align(
              alignment: Alignment.topLeft,
              child: SingleChildScrollView(
                child: Container(
                  width: 350,
                  color: themeData.colorScheme.primary.withOpacity(0.7),
                  child: Column(
                    children: [
                      const TitleWidget(),
                      BlocConsumer<AdvancedRoutePlannerBloc, AdvancedRoutePlannerState>(
                        listener: (context, state) {
                          if (state is FirstTripLoaded) {
                            startAddress = state.startAddress;
                            endAddress = state.endAddress;

                            routeBlocProvider.add(AddTripToListEvent(state.trip, selectedTrips));
                            BlocProvider.of<VisualizationBloc>(context).add(
                              ChangeRouteVizualizationEvent(selectedTrip: state.trip, trips: [state.trip]),
                            );
                          } else if (state is TripLoaded) {
                            String mode = state.trip.mode;
                            if (savedTrips[mode] == null) {
                              Map<String, Trip> newTrip = {state.trip.mode: state.trip};

                              savedTrips.addAll(newTrip);
                            }
                            routeBlocProvider.add(AddTripToListEvent(state.trip, selectedTrips));
                          }
                        },
                        builder: (context, state) {
                          if (state is AdvancedRoutePlannerInitial) {
                            savedTrips.clear();
                            selectedTrips.clear();

                            return AdvancedSearchInput(routeBlocProvider: routeBlocProvider);
                          } else if (state is LoadingFirstTrip) {
                            return Column(
                              children: [
                                AdvancedSearchInput(routeBlocProvider: routeBlocProvider),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CircularProgressIndicator(color: themeData.colorScheme.secondary),
                                )
                              ],
                            );
                          } else if (state is TripAddedOrRemoved) {
                            selectedTrips = state.trips;
                            listSelectedTrips = selectedTrips.values.toList();

                            return Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ResetRouteButton(
                                  resetTrips: () {
                                    context.goNamed(SearchScreen.routeName);

                                    /*routeBlocProvider.add(ResetTripsEvent());
                                    if (infoIsShown) {
                                      routeInfoBloc.add(HideRouteInfoEvent(
                                          trip: currentInfoTrip));
                                    }
                                    visualizationBloc
                                        .add(RemoveRouteVizualizationEvent());*/
                                  },
                                ),
                                AdvancedModeInputField(
                                    startAddress: startAddress,
                                    endAddress: endAddress,
                                    routeBlocProvider: routeBlocProvider,
                                    trips: savedTrips,
                                    selectedTrips: selectedTrips),
                                ResultList(trips: listSelectedTrips)
                              ],
                            );
                          } else if (state is LoadingTrip) {
                            return Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ResetRouteButton(
                                  resetTrips: () {
                                    context.goNamed(SearchScreen.routeName);

                                    /*routeBlocProvider.add(ResetTripsEvent());
                                    if (infoIsShown) {
                                      routeInfoBloc.add(HideRouteInfoEvent(
                                          trip: currentInfoTrip));
                                    }
                                    visualizationBloc
                                        .add(RemoveRouteVizualizationEvent());*/
                                  },
                                ),
                                AdvancedModeInputField(
                                    startAddress: startAddress,
                                    endAddress: endAddress,
                                    routeBlocProvider: routeBlocProvider,
                                    trips: savedTrips,
                                    selectedTrips: selectedTrips),
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: CircularProgressIndicator(color: themeData.colorScheme.secondary),
                                ),
                                ResultList(trips: listSelectedTrips),
                              ],
                            );
                          } else if (state is TripError) {
                            return Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                ResetRouteButton(
                                  resetTrips: () {
                                    context.goNamed(SearchScreen.routeName);

                                    // routeBlocProvider.add(ResetTripsEvent());
                                  },
                                ),
                                AdvancedModeInputField(
                                    startAddress: startAddress,
                                    endAddress: endAddress,
                                    routeBlocProvider: routeBlocProvider,
                                    trips: savedTrips,
                                    selectedTrips: selectedTrips),
                                const ResultListError(message: 'Error')
                              ],
                            );
                          } else if (state is FistTripError) {
                            return Column(
                              children: [
                                AdvancedSearchInput(routeBlocProvider: routeBlocProvider),
                                const ResultListError(
                                  message: 'Fehler',
                                )
                              ],
                            );
                          } else {
                            return const Center(child: Text('something went wrong'));
                          }
                        },
                      )
                    ],
                  ),
                ),
              ),
            ),
            BlocBuilder<RouteInfoBloc, RouteInfoState>(builder: (context, routeInfoState) {
              if (routeInfoState is RouteInfoLoadedState) {
                return RouteInfo(trip: routeInfoState.trip, visible: true);
              } else if (routeInfoState is RouteInfoHiddenState) {
                return RouteInfo(trip: routeInfoState.trip, visible: false);
              } else {
                return const Visibility(visible: false, child: Placeholder());
              }
            }),
          ]),
        ],
      ),
    );
  }
}
