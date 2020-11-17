import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/ProfileCreation/availability_creation.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/Components/student_course.dart';

class CourseSchedule extends StatefulWidget {

  @override
  CourseScheduleState createState() => new CourseScheduleState();
}

class CourseScheduleState extends State<CourseSchedule>{

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
                  children: getCourses(),
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
                          return Availability();
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

  List<Widget> getCourses(){
    List<Widget> mCourses = [];
    for (var i = 1; i <= courseCount; i++) {
      mCourses.add(StudentCourse(courseLabel: "Course $i"));
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