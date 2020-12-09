import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/HomePage/tutor_home_page.dart';

class Appointment extends StatelessWidget {
  final String course;
  final String tutor;
  final String tutorID;
  final DateTime date;
  final String id;
  final String tutorEmail;
  final String studentEmail;
  final String studentID;
  final String student;
  final bool isTutor;
  const Appointment({
    Key key,
    this.course,
    this.tutor,
    this.date,
    this.id,
    this.tutorEmail,
    this.studentEmail,
    this.studentID,
    this.student,
    this.tutorID,
    this.isTutor
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    String formattedDate = DateFormat('MM-dd-yyyy').format(date.toLocal());
    String formattedTime = DateFormat().add_jm().format(date.toLocal());
    String tORs = "Tutor: ";
    String tOrsemail = "Tutor Email: ";
    String name = tutor;
    String email = tutorEmail;
    if (isTutor){
      name = student;
      email = studentEmail;
       tORs = "Student: ";
       tOrsemail = "Student Email: ";
    }
    return  Stack(
        alignment: Alignment.topLeft,
        children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children:[
                      Row(
                        children: [
                          Text(tORs),
                          Text(
                            name,
                            style: TextStyle(fontWeight: FontWeight.bold),
                          )
                        ],
                      ),
                      Row(
                        children: [
                          Text(tOrsemail),
                          Text(
                            email,
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Text("Date: "),
                          Text(
                          formattedDate+" "+formattedTime,
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),

                        ],
                      ),
                      Row(
                        children: [
                          Text("Subject: "),
                          Text(
                            course,
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          IconButton(icon: Icon(Icons.message), onPressed: null),
                          IconButton(icon: Icon(Icons.cancel_outlined), onPressed: () async{

                            return showDialog<void>(
                              context: context,
                              barrierDismissible: false, // user must tap button!
                              builder: (BuildContext context) {
                                return AlertDialog(
                                  title: Text('Cancel Appointment?'),
                                  content: SingleChildScrollView(
                                    child: ListBody(
                                      children: <Widget>[
                                        Text('Are you sure you want to cancel this appointment?'),
                                      ],
                                    ),
                                  ),
                                  actions: <Widget>[
                                    TextButton(onPressed: () async{
                                      SharedPreferences pref = await SharedPreferences.getInstance();
                                      String jwt = (pref.getString('jwt') ?? "");
                                      var url = 'https://opentutor.herokuapp.com/auth/cancelAppointment';
                                      var response = await http.post(url,
                                          headers: {"content-type": "application/json","Authorization": jwt},
                                          body: jsonEncode({"apptID": id, "tutorID": tutorID, "dateObj": date.toString()})
                                      );
                                      print('Response status: ${response.statusCode}');
                                      print('Response body: ${response.body}');
                                      if (isTutor){
                                        Navigator.pushReplacement(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) {
                                                  return TutorHomePage();
                                                }
                                            )
                                        );
                                      }
                                      else{
                                        Navigator.pushReplacement(
                                            context,
                                            MaterialPageRoute(
                                                builder: (context) {
                                                  return HomePage();
                                                }
                                            )
                                        );
                                      }
                                    },
                                        child: Text('Yes')),
                                    TextButton(
                                      child: Text('No'),
                                      onPressed: () {
                                        Navigator.of(context).pop();
                                      },
                                    ),
                                  ],
                                );
                              },
                            );
                          })
                        ],
                      ),
                    ]
                ),
        ],
    );
  }
}