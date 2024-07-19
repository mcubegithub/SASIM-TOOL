import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/helpers/mobiscore_to_x.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/Costs.dart';

Widget costsCardLayer2(BuildContext context,
    {required CostsType costsType,
    required double height,
    required heightImage,
    required Trip trip,
    required isMobile}) {
  double personalImageOffset = 0;
  double socialImageOffset = 10;
  double thisSizeImage = isMobile ? heightImage - 20 : heightImage;
  TextTheme textTheme = Theme.of(context).textTheme;

  return SizedBox(
    height: height + thisSizeImage / 2,
    child: Stack(
      children: [
        Positioned.fill(
          top: thisSizeImage / 2,
          left: 0,
          child: Container(
            height: height,
            padding: EdgeInsets.all(mediumPadding),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.45),
              borderRadius: BorderRadius.circular(smallPadding),
            ),
            child: Align(
              alignment: Alignment.centerRight,
              child: SizedBox(
                width: 120,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      costsType == CostsType.social ? 'SOCIAL COSTS' : 'PERSONAL COSTS',
                      style: textTheme.labelLarge,
                    ),
                    const Divider(
                      thickness: 1,
                      color: Colors.black,
                    ),
                    Text(
                      costsType == CostsType.social
                          ? trip.costs.externalCosts.all.currencyString
                          : trip.costs.internalCosts.all.currencyString,
                      style: textTheme.headlineMedium,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
        Positioned(
          top: 0,
          left: costsType == CostsType.social ? socialImageOffset : personalImageOffset,
          child: costsType == CostsType.social
              ? Image.asset(
                  getAssetPathFromMobiScore(trip.mobiScore),
                  height: thisSizeImage,
                  width: thisSizeImage,
                )
              : SizedBox(
                  height: thisSizeImage, width: thisSizeImage, child: Image.asset('assets/icons/personal_null.png')),
        ),
      ],
    ),
  );
}
