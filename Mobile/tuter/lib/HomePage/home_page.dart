import 'dart:io';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/tutor.dart';
import 'package:tuter/HomePage/edit_profile.dart';
import 'package:tuter/HomePage/appointments.dart';
import 'package:tuter/HomePage/view_tutor_profile.dart';
import 'package:tuter/constants.dart';
import 'package:tuter/HomePage/search_page.dart';
import 'package:tuter/HomePage/view_profile.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class HomePage extends StatefulWidget {
  @override
  HomePageState createState() => new HomePageState();
}

class HomePageState extends State<HomePage>{

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          leading: IconButton(
            icon: Icon(Icons.person_outline, color: Colors.white),
            onPressed: () async{
              SharedPreferences pref = await SharedPreferences.getInstance();
              String jwt = (pref.getString('jwt') ?? "");
              Map<String, dynamic> jsonDecoded = parseJwt(jwt);
              print("JWT:");
              print(jsonDecoded.toString());
              print(jsonDecoded['user'].toString());
              print(jsonDecoded['user']['isTutor'].toString());
              bool isTutor = jsonDecoded['user']['isTutor'];

              if (isTutor){

                // HTTP call to get availibility
                var url = 'http://10.0.2.2:5000/auth/tutorProfile';
                var response = await http.get(url,
                  headers: {"content-type": "application/json",
                    "Authorization": jwt},
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
                var parsedJSON = jsonDecode(response.body);
                String firstName = parsedJSON['firstName'];
                String lastName = parsedJSON['lastName'];
                String school = parsedJSON['schoolName'];
                String email = parsedJSON['email'];
                List<dynamic> courses = parsedJSON['courses'];
                String bio = parsedJSON['bioBox'];
                List<dynamic> availability = parsedJSON['time'];

                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) {
                          return ViewTutorProfile(
                              firstName: firstName,
                              lastName: lastName,
                              schoolName: school,
                              email: email,
                              courses: courses,
                              availability: availability,
                              bio: bio
                          );
                        }
                    )
                );
              }
              else{
                var url = 'http://10.0.2.2:5000/auth/userinfo';
                var response = await http.get(url,
                  headers: {"content-type": "application/json",
                    "Authorization": jwt},
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
                var parsedJSON = jsonDecode(response.body);
                String firstName = parsedJSON['firstName'];
                String lastName = parsedJSON['lastName'];
                String school = parsedJSON['schoolName'];
                String email = parsedJSON['email'];
                List<dynamic> courses = parsedJSON['courses'];
                String bio = parsedJSON['bioBox'];

                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) {
                          return ViewProfile(
                              firstName: firstName,
                              lastName: lastName,
                              schoolName: school,
                              email: email,
                              courses: courses,
                              bio: bio
                          );
                        }
                    )
                );
              }
              },
          ),
          title: Text("Open Tutor"),
          actions: <Widget>[
            IconButton(
                icon: Icon(Icons.search, color: Colors.white),
                onPressed: (){
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return SearchPage();
                      }
                    )
                  );
                })
          ],
      ),
      body:
      Container(
        height: size.height,
        width: double.infinity,
        color: darkBackground,
        child: ListView(
          children: [
            Container(
              height: size.height * 0.2,
              margin: EdgeInsets.all(10.0),
              color: kPrimaryLightColor,
              child: Appointment(),
            ),
          ],
        ),
      ),
      /*endDrawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            Container(
                height: 120.0,
                child: DrawerHeader(
                decoration: BoxDecoration(
                  color: kPrimaryLightColor,
                ),
                margin: EdgeInsets.only(bottom: 2.0),
                padding: EdgeInsets.fromLTRB(6.0, 6.0, 6.0, 2.0)
            ),
            ),
            RoundedButton(
              text: 'My Appointments',
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return Appointments();
                    }
                  )
                );
              }
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                  RaisedButton(
                    onPressed: (){},
                    color: Colors.deepPurpleAccent,
                    child: Text("Course 1"),
                    padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                  ),
                  RaisedButton(
                    onPressed: (){},
                    color: Colors.deepPurpleAccent,
                    child: Text("Course 2"),
                    padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                  ),
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    RaisedButton(
                      onPressed: (){},
                      color: Colors.deepPurpleAccent,
                      child: Text("Course 3"),
                      padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                    ),
                    RaisedButton(
                      onPressed: (){},
                      color: Colors.deepPurpleAccent,
                      child: Text("Course 4"),
                      padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                    ),
                  ],
                )
              ],
            ),
            ListTile(
              title: Text('Advanced Search'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ), */
    );
  }

  Map<String, dynamic> parseJwt(String token) {
    final parts = token.split('.');
    if (parts.length != 3) {
      throw Exception('invalid token');
    }

    final payload = _decodeBase64(parts[1]);
    final payloadMap = json.decode(payload);
    if (payloadMap is! Map<String, dynamic>) {
      throw Exception('invalid payload');
    }

    return payloadMap;
  }

  String _decodeBase64(String str) {
    String output = str.replaceAll('-', '+').replaceAll('_', '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Exception('Illegal base64url string!"');
    }

    return utf8.decode(base64Url.decode(output));
  }
}