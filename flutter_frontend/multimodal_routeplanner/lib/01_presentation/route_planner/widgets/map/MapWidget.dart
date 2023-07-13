import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:flutter_map_tappable_polyline/flutter_map_tappable_polyline.dart';
import 'package:latlong2/latlong.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner/widgets/map/StartMarker.dart';
import 'package:multimodal_routeplanner/02_application/bloc/visualization_bloc.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Waypoint.dart';
import 'package:multimodal_routeplanner/config/munich_geo_values.dart';
import 'package:multimodal_routeplanner/values.dart';

import 'StopMarker.dart';

class MapWidget extends StatefulWidget {
  const MapWidget({Key? key}) : super(key: key);

  @override
  State<MapWidget> createState() => _MapWidgetState();
}

class _MapWidgetState extends State<MapWidget> {
  final MapController _mapController = MapController();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<VisualizationBloc, VisualizationState>(
      listener: (context, state) {
        if (state is VisualizationChangedState) {
          LatLngBounds bounds = _fitTripBounds(state.selectedTrip);
          _mapController.fitBounds(
            bounds,
            options: const FitBoundsOptions(
              padding: EdgeInsets.all(48),
            ),
          );
        }
      },
      builder: (context, state) {
        return FlutterMap(
          mapController: _mapController,
          options: MapOptions(
            onMapReady: () {},
            center: munichCenter,
            zoom: 13.0,
          ),
          nonRotatedChildren: [
            RichAttributionWidget(
              animationConfig: const ScaleRAWA(), // Or `FadeRAWA` as is default
              attributions: [
                TextSourceAttribution('OpenStreetMap contributors',
                    onTap: () {} // => launchUrl(Uri.parse('https://openstreetmap.org/copyright')),
                ),
              ],
            ),
          ],
          children: [
            TileLayer(
                urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                subdomains: const ['a', 'b', 'c']),
            if (state is VisualizationChangedState)
              TappablePolylineLayer(
                  polylineCulling: true,
                  polylines: [
                    // visualize selected
                    for (var i = 0; i < state.selectedTrip.segments.length; i++)
                      TaggedPolyline(
                        points: state.selectedTrip.segments[i].getWaypointInLagLng(),
                        tag: "selected",
                        strokeWidth: 5,
                        color: mapSegmentModeToColor(state.selectedTrip.segments[i].mode),
                      ),
                  ],
                  onTap: (polylines, tapPosition) => {},
                  onMiss: (tapPosition) {}),
            if (state is VisualizationChangedState)
              MarkerLayer(
                markers: [
                  Marker(
                    point: state.selectedTrip.segments.first.waypoints.first.getLatLng(),
                    builder: (ctx) => const StartMarker(),
                  ),
                  Marker(
                    point: state.selectedTrip.segments.last.waypoints.last.getLatLng(),
                    builder: (ctx) => const StopMarker(),
                  ),
                ],
              ),
          ],
        );
      },
    );
  }

  LatLngBounds _fitTripBounds(Trip selectedTrip) {
    List<Waypoint> allWaypoints = selectedTrip.segments.expand((segment) => segment.waypoints).toList();
    double maxLat = allWaypoints.map((latLng) => latLng.lat).reduce(max);
    double maxLon = allWaypoints.map((latLng) => latLng.lon).reduce(max);
    double minLat = allWaypoints.map((latLng) => latLng.lat).reduce(min);
    double minLon = allWaypoints.map((latLng) => latLng.lon).reduce(min);
    LatLngBounds bounds = LatLngBounds(
      LatLng(maxLat, maxLon),
      LatLng(minLat, minLon),
    );

    return bounds;
  }

  mapSegmentModeToColor(String segmentType) {
    final Values values = Values();

    switch (segmentType) {
      case 'CAR':
        return values.carColor;

      case 'ECAR':
        return values.carColor;

      case 'MOPED':
        return values.mopedColor;

      case 'EMOPED':
        return values.mopedColor;

      case 'BICYCLE':
        return values.bikeColor;

      case 'EBICYCLE':
        return values.bikeColor;

      case 'TIER':
        return values.tierColor;

      case 'EMMY':
        return values.emmyColor;

      case 'FLINKSTER':
        return values.flinksterColor;

      case 'CAB':
        return values.cabColor;

      case 'SHARENOW':
        return values.sharenowColor;

      case 'WALK':
        return values.walkColor;

      case 'METRO':
        return values.metroColor;

      case 'REGIONAL_TRAIN':
        return values.trainColor;

      case 'TRAM':
        return values.tramColor;

      case 'BUS':
        return values.busColor;

      default:
        return values.carColor;
    }
  }
}
