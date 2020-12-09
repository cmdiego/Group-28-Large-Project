import 'dart:io';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/apptParent.dart';
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
import 'package:tuter/Components/appt.dart';

class TutorHomePage extends StatefulWidget {
  @override
  TutorHomePageState createState() => new TutorHomePageState();
}

class TutorHomePageState extends State<TutorHomePage>{
  List<Widget> appointmentWidgets = [];
  String jwt;
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
              // HTTP call to get availibility
              var url = 'https://opentutor.herokuapp.com/auth/tutorProfile';
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
          },
        ),
        title: Text("My Appointments"),
      ),
      body:
      Container(
        height: size.height,
        width: double.infinity,
        color: darkBackground,
        child: Column(
          children: [
            FlatButton(
              padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
              color: kPrimaryColor,
              onPressed:() async{
                appointmentWidgets = [];
                SharedPreferences pref = await SharedPreferences.getInstance();
                String jwt = (pref.getString('jwt') ?? "");
                Map<String, dynamic> jsonDecoded = parseJwt(jwt);
                print("JWT:");
                print(jsonDecoded.toString());
                print(jsonDecoded['user'].toString());
                print(jsonDecoded['user']['isTutor'].toString());
                bool isTutor = jsonDecoded['user']['isTutor'];
                var url = 'https://opentutor.herokuapp.com/auth/getAppointment';
                var response = await http.get(url,
                  headers: {"content-type": "application/json","Authorization": jwt},
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
                List<Appt> appointments = Appts.fromJson(jsonDecode(response.body)).appt;
                for (int i = 0; i < appointments.length; i++){
                  var currentAppointment = appointments[i];
                  String course = currentAppointment.course;
                  String sId = currentAppointment.sId;
                  String tutorID = currentAppointment.tutor;
                  String tutorName = currentAppointment.tutorName;
                  DateTime date = DateTime.parse(currentAppointment.time);
                  String tutorEmail = currentAppointment.tutorEmail;
                  String studentEmail = currentAppointment.studentEmail;
                  String studentID = currentAppointment.student;
                  String studentName = currentAppointment.studentName;
                  print("id:" + sId);
                  appointmentWidgets.add(
                      Container(
                        height: size.height * 0.2,
                        margin: EdgeInsets.all(10.0),
                        color: kPrimaryLightColor,
                        child: Appointment(
                          course: course,
                          tutor: tutorName,
                          tutorID: tutorID,
                          id: sId,
                          date: date,
                          tutorEmail: tutorEmail,
                          student: studentName,
                          studentEmail: studentEmail,
                          studentID: studentID,
                          isTutor: isTutor,
                        ),
                      )
                  );
                }

                setState(() {

                });
              },
              child: Text( "Refresh",
                style: TextStyle(color: kPrimaryLightColor),
              ),
            ),
            Flexible(
              child: FutureBuilder<List<Widget>>(
                future: getAppointments(size),
                builder: (BuildContext context, AsyncSnapshot<List<Widget>> snapshot){
                  List<Widget> children;
                  if (snapshot.hasData){
                    children = snapshot.data;
                  }
                  else {
                    children = <Widget>[
                      SizedBox(
                        child: CircularProgressIndicator(),
                        width: 60,
                        height: 60,
                      ),
                    ];
                  }
                  return ListView(children: children);
                },
              ),
            ),
          ],
        ),
      ),
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

  Future<List<Widget>> getAppointments(Size size) async{
    List<Widget> aWidgets = [];
    SharedPreferences pref = await SharedPreferences.getInstance();
    String jwt = (pref.getString('jwt') ?? "");
    Map<String, dynamic> jsonDecoded = parseJwt(jwt);
    print("JWT:");
    print(jsonDecoded.toString());
    print(jsonDecoded['user'].toString());
    print(jsonDecoded['user']['isTutor'].toString());
    bool isTutor = jsonDecoded['user']['isTutor'];
    var url = 'https://opentutor.herokuapp.com/auth/getAppointment';
    var response = await http.get(url,
      headers: {"content-type": "application/json","Authorization": jwt},
    );
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
    List<Appt> appointments = Appts.fromJson(jsonDecode(response.body)).appt;
    for (int i = 0; i < appointments.length; i++){
      var currentAppointment = appointments[i];
      String course = currentAppointment.course;
      String sId = currentAppointment.sId;
      String tutorID = currentAppointment.tutor;
      String tutorName = currentAppointment.tutorName;
      DateTime date = DateTime.parse(currentAppointment.time);
      String tutorEmail = currentAppointment.tutorEmail;
      String studentEmail = currentAppointment.studentEmail;
      String studentID = currentAppointment.student;
      String studentName = currentAppointment.studentName;

      print("id:" + sId);
      aWidgets.add(
          Container(
            height: size.height * 0.2,
            margin: EdgeInsets.all(10.0),
            color: kPrimaryLightColor,
            child: Appointment(
              course: course,
              tutor: tutorName,
              tutorID: tutorID,
              id: sId,
              date: date,
              tutorEmail: tutorEmail,
              student: studentName,
              studentEmail: studentEmail,
              studentID: studentID,
              isTutor: isTutor,
            ),
          )
      );
    }
    return aWidgets;
  }

  List<Widget> getActions(BuildContext context) {
    List<Widget> actions = [];
    bool isTutor = getIsTutor();
    if (!isTutor){
      actions.add(
          IconButton(
              icon: Icon(Icons.search, color: Colors.white),
              onPressed: () async{
                SharedPreferences pref = await SharedPreferences.getInstance();
                String jwt = (pref.getString('jwt') ?? "");
                var url = 'https://opentutor.herokuapp.com/auth/getCourse';
                var response = await http.get(url,
                  headers: {"content-type": "application/json",
                    "Authorization": jwt},
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
                var parsedJSON = jsonDecode(response.body);
                List<dynamic> courses = parsedJSON['courses'];
                List<String> coursesStrings = [];
                for (var i = 0; i<courses.length; i++) {
                  coursesStrings.add(courses[i].toString());
                }
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) {
                          return SearchPage(
                            courses: coursesStrings,
                          );
                        }
                    )
                );
              })
      );
    }
  }

  bool getIsTutor(){
    getJWT();
    Map<String, dynamic> jsonDecoded = parseJwt(jwt);
    print("JWT:");
    print(jsonDecoded.toString());
    print(jsonDecoded['user'].toString());
    print(jsonDecoded['user']['isTutor'].toString());
    bool isTutor = jsonDecoded['user']['isTutor'];
    return isTutor;
  }

  void getJWT() async{
    SharedPreferences pref = await SharedPreferences.getInstance();
    String jwt = (pref.getString('jwt') ?? "");
  }
}