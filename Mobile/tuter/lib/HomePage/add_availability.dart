import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/timeslot.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/Components/student_course.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/constants.dart';


class AddAvailability extends StatefulWidget {
  final List<dynamic> currentAvailability;
  final String firstName;
  final String lastName;
  final String schoolName;
  final String email;
  final String bio;
  AddAvailability({
    this.currentAvailability,
    this.firstName,
    this.lastName,
    this.schoolName,
    this.email,
    this.bio
  });
  @override
  AddAvailabilityState createState() => new AddAvailabilityState();
}

class AddAvailabilityState extends State<AddAvailability>{
  List<Widget> timeSlots = [];
  List<DateTime> timeSlotData = [];
  List<String> datesToPass = [];
  int count = -1;
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        height: size.height,
        color: darkBackground,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Flexible(
              child: new ListView(
                children: getTimeSlots(),
                scrollDirection: Axis.vertical,
              ),
            ),
            RoundedButton(
              text: "Submit",
              press: () async {

                for (var i = 0; i < count; i++){
                  datesToPass.add(timeSlotData[i].toString());
                }

                var url = 'http://10.0.2.2:5000/auth/modifyAvailability';
                SharedPreferences pref = await SharedPreferences.getInstance();
                String jwt = (pref.getString('jwt') ?? "");
                print("Date Array: "+timeSlotData.toString());
                var response = await http.post(url,
                    headers: {"content-type": "application/json",
                      "Authorization": jwt},
                    body: jsonEncode({"count": count,"editArray": datesToPass})
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) {
                          return HomePage();
                        }
                    )
                );
              },
            )
          ],
        ),
      ),
    );
  }

  List<Widget> getTimeSlots(){
    timeSlots = [];
    timeSlotData =[];
    if (count == -1){
      count = widget.currentAvailability.length + 1;
    }
    for (var i = 1; i <= count; i++) {
      timeSlotData.add(DateTime.now());
      DateTime toPass = DateTime.now();
      if (i <= widget.currentAvailability.length) {
        String toCompute = widget.currentAvailability[i - 1].toString();
        String toCompute2 = parseDate(toCompute);
        toPass = DateTime.parse(toCompute2);
        timeSlotData[i-1]=toPass;
      }
        TimeSlot newSlot = TimeSlot(
          initialDateTime: toPass,
          onDateTimeSelect: (DateTime date) {
            timeSlotData[i-1]=date;
          },
        );
      timeSlots.add(
          Container(
              margin: EdgeInsets.all(10.0),
              padding: EdgeInsets.only(top: 10.0, left: 10.0),
              color: kPrimaryLightColor,
              child: newSlot
          ));
    }
    if (count > 1) {
      timeSlots.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addTimeslot, iconSize: 40.0, color: kPrimaryColor),
              IconButton(icon: Icon(Icons.remove_circle_outline), onPressed: deleteTimeslot, iconSize: 40.0, color: kPrimaryColor)
            ],
          ));
    }
    else{
      timeSlots.add(
        IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addTimeslot, iconSize: 40.0, color: kPrimaryColor),
      );
    }
    return timeSlots;
  }

  void addTimeslot() {
    setState(() {
      count = count + 1;
    });
  }

  void deleteTimeslot() {
    setState(() {
      count = count - 1;
    });
  }

  String parseDate(String toParse){
    List<String> map = toParse.split("/");
    String month = map[0];
    String day = map[1];
    if (day.length == 1) {
      day = "0" + day;
    }
    List<String> map2 = map[2].split(" ");
    String year = map2[0];
    String time = map2[1];
    String ampm = map2[2];
    if (ampm == "PM"){
      List<String> map3 = time.split(":");
      int hour = int.parse(map3[0]);
      if (hour != 12){
        hour += 12;
      }
      time = hour.toString() + ":" + map3[1] + ":" + map3[2];
    }
    else {
      List<String> map3 = time.split(":");
      int hour = int.parse(map3[0]);
      String hourstring = hour.toString();
      if (hour == 12){
        hourstring = "0";
      }
      if (hourstring.length == 1){
        hourstring = "0"+hourstring;
      }
      time = hourstring + ":" + map3[1] + ":" + map3[2];
    }
    String output = year+"-"+month+"-"+day+" "+time;
    return output;
  }
}