import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/timeslot.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/Components/student_course.dart';
import 'package:tuter/HomePage/home_page.dart';

class Availability extends StatefulWidget {

  @override
  AvailabilityState createState() => new AvailabilityState();
}

class AvailabilityState extends State<Availability>{

  int courseCount = 1;
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        height: size.height,
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
              press: () {
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
    List<Widget> mCourses = [];
    for (var i = 1; i <= courseCount; i++) {
      mCourses.add(TimeSlot());
    }
    mCourses.add(IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addCourse, iconSize: 40.0,));
    return mCourses;
  }
  void addCourse() {
    setState(() {
      courseCount = courseCount + 1;
    });
  }
}