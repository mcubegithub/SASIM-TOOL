import 'package:flutter/material.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v2/commons/spacers.dart';
import 'package:multimodal_routeplanner/01_presentation/route_planner_v3/helpers/costs_category_to_image.dart';
import 'package:multimodal_routeplanner/03_domain/entities/Trip.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/Costs.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/ExternalCosts.dart';
import 'package:multimodal_routeplanner/03_domain/entities/costs/InternalCosts.dart';

Widget costsDetailsCardLayer2(BuildContext context,
    {required Trip selectedTrip, required double width, required CostsType costsType}) {
  String mobiScore = selectedTrip.mobiScore;
  return Container(
      width: width,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.45),
        borderRadius: BorderRadius.circular(smallPadding),
      ),
      child: Padding(
        padding: EdgeInsets.all(largePadding),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            if (costsType == CostsType.social) ...[
              costsDetailColumn(context,
                  trip: selectedTrip,
                  costsType: costsType,
                  socialCostsCategory: SocialCostsCategory.time,
                  mobiScore: mobiScore),
              costsDetailColumn(context,
                  trip: selectedTrip,
                  costsType: costsType,
                  socialCostsCategory: SocialCostsCategory.health,
                  mobiScore: mobiScore),
              costsDetailColumn(context,
                  trip: selectedTrip,
                  costsType: costsType,
                  socialCostsCategory: SocialCostsCategory.environment,
                  mobiScore: mobiScore),
            ] else if (costsType == CostsType.personal) ...[
              costsDetailColumn(context,
                  trip: selectedTrip,
                  costsType: costsType,
                  personalCostsCategory: PersonalCostsCategory.fixed,
                  mobiScore: mobiScore),
              costsDetailColumn(
                context,
                trip: selectedTrip,
                costsType: costsType,
                personalCostsCategory: PersonalCostsCategory.variable,
                mobiScore: mobiScore,
              ),
            ]
          ],
        ),
      ));
}

Widget costsDetailColumn(BuildContext context,
    {required Trip trip,
    required CostsType costsType,
    required String mobiScore,
    SocialCostsCategory? socialCostsCategory,
    PersonalCostsCategory? personalCostsCategory}) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Image.asset(
        getImagePath(
            costsType: costsType,
            mobiScore: mobiScore,
            socialCostsCategory: socialCostsCategory,
            personalCostsCategory: personalCostsCategory),
        height: 100,
        width: 100,
        errorBuilder: (context, error, stackTrace) {
          return const Center(child: Icon(Icons.error));
        },
      ),
      Text(
          (costsType == CostsType.social && socialCostsCategory != null)
              ? getSocialCostsCurrencyValue(
                  socialCosts: trip.costs.externalCosts, socialCostsCategory: socialCostsCategory)
              : (costsType == CostsType.personal && personalCostsCategory != null)
                  ? getPrivateCostsCurrencyValue(
                      personalCosts: trip.costs.internalCosts, personalCostsCategory: personalCostsCategory)
                  : '',
          style: Theme.of(context).textTheme.headlineMedium),
      smallVerticalSpacer,
      Text(
          (costsType == CostsType.social && socialCostsCategory != null)
              ? getSocialCostsLabel(context, socialCostsCategory: socialCostsCategory)
              : (costsType == CostsType.personal && personalCostsCategory != null)
                  ? getPersonalCostsLabel(context, personalCostsCategory: personalCostsCategory)
                  : '',
          style: Theme.of(context).textTheme.labelSmall),
    ],
  );
}

String getImagePath(
    {required CostsType costsType,
    required String mobiScore,
    SocialCostsCategory? socialCostsCategory,
    PersonalCostsCategory? personalCostsCategory}) {
  String path = '';
  if (costsType == CostsType.social && socialCostsCategory != null) {
    path = getSocialCostsImagePath(socialCostsCategory: socialCostsCategory, mobiScore: mobiScore);
  }
  if (costsType == CostsType.personal && personalCostsCategory != null) {
    // no mobiScore parameter, because Mobi-Score is (for now) not dependent on personal costs
    path = getPersonalCostsImagePath(personalCostsCategory: personalCostsCategory);
  }
  return path;
}

String getSocialCostsCurrencyValue(
    {required ExternalCosts socialCosts, required SocialCostsCategory socialCostsCategory}) {
  switch (socialCostsCategory) {
    case SocialCostsCategory.time:
      return socialCosts.timeCosts.currencyString;
    case SocialCostsCategory.health:
      return socialCosts.healthCosts.currencyString;
    case SocialCostsCategory.environment:
      return socialCosts.environmentCosts.currencyString;
  }
}

String getPrivateCostsCurrencyValue(
    {required InternalCosts personalCosts, required PersonalCostsCategory personalCostsCategory}) {
  switch (personalCostsCategory) {
    case PersonalCostsCategory.fixed:
      return personalCosts.fixedCosts.currencyString;
    case PersonalCostsCategory.variable:
      return personalCosts.variableCosts.currencyString;
  }
}

String getSocialCostsLabel(BuildContext context, {required SocialCostsCategory socialCostsCategory}) {
  switch (socialCostsCategory) {
    case SocialCostsCategory.time:
      return 'TIME';
    case SocialCostsCategory.health:
      return 'HEALTH';
    case SocialCostsCategory.environment:
      return 'ENVIRONMENT';
  }
}

String getPersonalCostsLabel(BuildContext context, {required PersonalCostsCategory personalCostsCategory}) {
  switch (personalCostsCategory) {
    case PersonalCostsCategory.fixed:
      return 'FIXED';
    case PersonalCostsCategory.variable:
      return 'VARIABLE';
  }
}
