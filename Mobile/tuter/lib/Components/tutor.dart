import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class Tutor extends StatelessWidget {
  final String firstName;
  final String lastName;
  final String email;
  final DateTime date;
  final double rating;
  final List<DateTime> otherTimes;
  final String tutorID;
  final String course;
  const Tutor({
    Key key,
    this.firstName,
    this.lastName,
    this.email,
    this.date,
    this.rating,
    this.otherTimes,
    this.tutorID,
    this.course
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    String formattedDate = DateFormat('MM-dd-yyyy').format(date.toLocal());
    String formattedTime = DateFormat().add_jm().format(date.toLocal());
    List<String> otherTimesString = [];
    for (var i = 0; i < otherTimes.length; i++){
      otherTimesString.add(otherTimes[i].toString());
    }
    return Container(
      width: double.infinity,
      child: Stack(
        alignment: Alignment.topLeft,
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Row(
                  children: [
                    SizedBox(width: 1.0),
                    Text(
                      "Tutor: ",
                    ),
                    Text(
                      "${firstName} ${lastName}",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    )
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      Text(
                        "Date: ${formattedDate}",
                      ),
                      SizedBox(width: 10.0),
                      Text(
                        "Start Time: ${formattedTime}",
                      ),
                    ]
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      /*Text(
                        "Rating: "
                      ),
                      Row(
                      children: List.generate(5, (index) {
                        return index < 3 ? Icon(Icons.star) : Icon(Icons
                            .star_outline);
                      }
                      ),
                      ),*/
                      FlatButton(
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        color: kPrimaryColor,
                        onPressed:() async{

                          SharedPreferences pref = await SharedPreferences.getInstance();
                          String jwt = (pref.getString('jwt') ?? "");
                          var url = 'https://opentutor.herokuapp.com/auth/createAppointment';
                          var response = await http.post(url,
                              headers: {"content-type": "application/json","Authorization": jwt},
                              body: jsonEncode({"tutorID": tutorID, "courseName": course, "dateObj": date.toString(), "tutorName": "${firstName} ${lastName}", "tutorEmail": email, "tutorAvail": otherTimesString})
                          );
                          print('Response status: ${response.statusCode}');
                          print('Response body: ${response.body}');

                          Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                  builder: (context) {
                                    return HomePage();
                                  }
                              )
                          );

                        },
                        child: Text( "Schedule",
                          style: TextStyle(color: kPrimaryLightColor),
                        ),
                      ),
                    ]

                ),
                SizedBox(height: size.height * 0.03),
              ],
            ),
          ),
        ],
      ),
    );
  }
}