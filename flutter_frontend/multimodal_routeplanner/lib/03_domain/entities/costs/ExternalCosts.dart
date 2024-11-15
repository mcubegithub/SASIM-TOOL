class ExternalCosts {
  final double air;
  final double noise;
  final double climate;
  final double accidents;
  final double space;
  final double barrier;
  final double congestion;
  final double all;

  ExternalCosts(
      {required this.air,
      required this.noise,
      required this.climate,
      required this.accidents,
      required this.space,
      required this.barrier,
      required this.congestion,
      required this.all});
}

extension ExternalCostsExtension on ExternalCosts {
  double get timeCosts => congestion + barrier;

  double get healthCosts => noise + accidents + air;

  double get environmentCosts => climate + space;
}

enum SocialCostsCategory { time, health, environment }
