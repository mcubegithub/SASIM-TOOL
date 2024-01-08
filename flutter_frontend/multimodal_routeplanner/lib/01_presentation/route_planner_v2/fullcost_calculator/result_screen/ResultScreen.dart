import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/headers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/fullcost_calculator/result_screen/results_section/ResultSection.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/fullcost_calculator/search_screen/SearchScreen.dart';
import 'package:multimodal_routeplanner/02_application/bloc/sasim_2/trips_cubit.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key, required this.startAddress, required this.endAddress});

  final String startAddress;
  final String endAddress;
  static const String routeName = 'result-screen';

  @override
  Widget build(BuildContext context) {
    context.read<TripsCubit>().loadTrips(startAddress, endAddress);

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SingleChildScrollView(
        child: Column(
          children: [
            const TitleImage(
                imagePath: 'assets/title_image/titelbild_ubahn.png',
                titleText: 'Was sind die wahren Kosten deiner Mobilität?'),
            fromToHeader(context),
            BlocBuilder<TripsCubit, TripsState>(
              builder: (context, state) {
                if (state is TripsLoading) {
                  return const Center(child: LinearProgressIndicator());
                }
                if (state is TripsLoaded) {
                  return ResultSection(
                      listTrips: state.trips,
                      realoadCallback: () {
                        context.read<TripsCubit>().loadTrips(startAddress, endAddress);
                      });
                }
                if (state is TripsError) {
                  return resultErrorWidget(context, state: state);
                }
                return resultErrorWidget(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget fromToHeader(BuildContext context) {
    double iconSpace = 32;
    double newRouteButtonWidth = 100;
    ColorScheme colorScheme = Theme.of(context).colorScheme;
    Color contentColor = colorScheme.primary;

    return Padding(
      padding: const EdgeInsets.all(32.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          SizedBox(width: newRouteButtonWidth + iconSpace),
          addressInfo(context, 'VON', startAddress, contentColor),
          SizedBox(width: iconSpace),
          Icon(
            Icons.double_arrow,
            color: contentColor,
            size: 48,
          ),
          SizedBox(width: iconSpace),
          addressInfo(context, 'NACH', endAddress, contentColor),
          SizedBox(width: iconSpace),
          InkWell(
            onTap: () {
              context.goNamed(SearchScreen.routeName);
            },
            child: Container(
              width: newRouteButtonWidth,
              decoration: BoxDecoration(
                color: colorScheme.primaryContainer,
              ),
              child: Text('neue Route',
                  textAlign: TextAlign.center,
                  style: Theme.of(context)
                      .textTheme
                      .bodyLarge!
                      .copyWith(color: colorScheme.onPrimaryContainer)),
            ),
          )
        ],
      ),
    );
  }

  Widget addressInfo(BuildContext context, String label, String address, Color contentColor) {
    TextTheme textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context)
              .textTheme
              .titleMedium!
              .copyWith(color: contentColor, fontWeight: FontWeight.bold),
        ),
        Text(
          address,
          style: textTheme.bodyLarge!.copyWith(color: contentColor),
        ),
      ],
    );
  }

  Center resultErrorWidget(BuildContext context, {TripsError? state}) {
    return Center(
      child: Column(
        children: [
          Text(
            'irgendwas ist schiefgegangen',
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          if (state != null) Text(state.message),
        ],
      ),
    );
  }
}