import 'package:flutter/material.dart';
import 'package:tuter/constants.dart';
import 'package:tuter/Login/login_page.dart';
import 'package:uni_links/uni_links.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Tuter',
      theme: ThemeData(
        primaryColor: kPrimaryColor,
        scaffoldBackgroundColor: Colors.white,
      ),
      home: StreamBuilder(
        stream: getLinksStream(),
        builder: (context, snapshot){
          if( snapshot.hasData ) { // our app started by configured links
            var uri = Uri.parse(snapshot.data);
            var list =uri.queryParametersAll.entries.toList(); // we retrieve all query uparameters , tzd://genius-team.com?prodct_id=1

            return Text(list.map((f)=>f.toString()).join('-'));
            // we just print all //parameters but you can now do whatever you want, for example open //product details page.
          }else { // our app started normally
            return LoginPage();
          }
      }
      ),
    );
  }
}