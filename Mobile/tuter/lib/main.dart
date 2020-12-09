import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/HomePage/change_password.dart';
import 'package:tuter/Login/reset_password.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/constants.dart';
import 'package:tuter/Login/login_page.dart';
import 'package:uni_links/uni_links.dart';

import 'dart:async';
import 'dart:io';

import 'package:uni_links/uni_links.dart';
import 'package:flutter/services.dart' show PlatformException;

StreamSubscription _sub;
Widget homePage = LoginPage();

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  await initUniLinks();
  runApp(MyApp());
}

Future<Null> initUniLinks() async {
  // ... check initialLink
  try {
    String initialLink = await getInitialLink();
    if (initialLink != null) {
      print("initialLink: " + initialLink);
      if (initialLink.indexOf("email-activate") > -1){
        String token = initialLink.substring(initialLink.indexOf("email-activate")+15);
        print("Token: "+token);
        homePage = ProfileInformation(
          token: token
        );
      }
      else  if (initialLink.indexOf("reset-password") > -1){
        String token = initialLink.substring(initialLink.indexOf("reset-password")+15);
        print("Token: "+token);
        homePage = ResetPassword(
          token: token,
        );
      }
    }
    // Parse the link and warn the user, if it is not correct,
    // but keep in mind it could be `null`.
  } on PlatformException {
    // Handle exception by warning the user their action did not succeed
    // return?
  }
  // Attach a listener to the stream
  _sub = getLinksStream().listen((String link) {
    // Parse the link and warn the user, if it is not correct
    print("Link: "+link);
    if (link.indexOf("email-activate") > -1){
      String token = link.substring(link.indexOf("email-activate")+15);
      print("Token: "+token);
      homePage = ProfileInformation(
          token: token
      );
    }
  }, onError: (err) {
    // Handle exception by warning the user their action did not succeed
  });
  return;
  // NOTE: Don't forget to call _sub.cancel() in dispose()
}

class MyApp extends StatefulWidget {
  @override
  MyAppState createState() => new MyAppState();
}
class MyAppState extends State<MyApp> {

  @override
  void dispose(){
    _sub.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print('BUILDING!!!');
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Tuter',
        theme: ThemeData(
          primaryColor: kPrimaryColor,
          scaffoldBackgroundColor: Colors.white,
        ),
        home: homePage
    );
  }
}
