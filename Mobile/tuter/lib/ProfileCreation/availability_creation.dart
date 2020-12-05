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


class Availability extends StatefulWidget {

  @override
  AvailabilityState createState() => new AvailabilityState();
}

class AvailabilityState extends State<Availability>{
  List<Widget> timeSlots = [];
  List<DateTime> timeSlotData = [];
  int count = 1;
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
                var url = 'http://10.0.2.2:5000/timeslot/add';
                SharedPreferences pref = await SharedPreferences.getInstance();
                String jwt = (pref.getString('jwt') ?? "");
                print("Date: "+timeSlotData[i].toString());
                var response = await http.post(url,
                    headers: {"content-type": "application/json",
                      "Authorization": jwt},
                    body: jsonEncode({"date": timeSlotData[i].toString()})
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');
              }

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
    for (var i = 1; i <= count; i++) {
      TimeSlot newSlot = TimeSlot(
        onDateTimeSelect: (DateTime date){
          timeSlotData.add(date);
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
}