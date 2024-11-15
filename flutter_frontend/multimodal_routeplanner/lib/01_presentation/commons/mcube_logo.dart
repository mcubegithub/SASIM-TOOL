import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

Widget mcubeLogo(BuildContext context, {double? width, Alignment? alignment}) {
  final Uri mcubeUrl = Uri.parse('https://www.mcube-cluster.de/');

  Future<void> launchMcubeUrl() async {
    if (!await launchUrl(mcubeUrl)) {
      throw Exception('Could not launch $mcubeUrl');
    }
  }

  // get localization setting
  final Locale locale = Localizations.localeOf(context);

  String imagePath = (locale == const Locale('de'))
      ? 'assets/mcube_logos/mcube_logo_with_text_black_de.png'
      : 'assets/mcube_logos/mcube_logo_with_text_black_en.png';

  return Align(
    alignment: alignment ?? Alignment.topRight,
    child: Padding(
      padding: const EdgeInsets.all(8.0),
      child: InkWell(
        onTap: () async {
          launchMcubeUrl();
        },
        hoverColor: Colors.transparent,
        child: Image(
          height: width == null ? 64 : null,
          width: width,
          image: AssetImage(imagePath),
        ),
      ),
    ),
  );
}
