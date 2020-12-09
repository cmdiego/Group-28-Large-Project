import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/ProfileCreation/availability_creation.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/Components/student_course.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/constants.dart';

class CourseSchedule extends StatefulWidget {

  @override
  CourseScheduleState createState() => new CourseScheduleState();
}

class CourseScheduleState extends State<CourseSchedule>{
  List<Widget> mCourses = [];
  List<TextEditingController> codeControllers = [];
  int courseCount = 1;
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
                  children: getCourses(),
                  scrollDirection: Axis.vertical,
                ),
            ),
            RoundedButton(
              text: "Submit",
              press: () async{
                var courses = [];
                for (var i = 0; i < courseCount; i++){
                  var courseToAdd = codeControllers[i].text;
                  courses.add(courseToAdd);
                }
                SharedPreferences pref = await SharedPreferences.getInstance();
                bool isTutor = (pref.getBool("isTutor") ?? false);
                String jwt = (pref.getString('jwt') ?? "");

                var url = 'https://opentutor.herokuapp.com/auth/addcourse';
                var response = await http.post(url,
                    headers: {"content-type": "application/json",
                    "Authorization": jwt},
                    body: jsonEncode({
                      "count": courseCount,
                      "courses": courses
                      })
                );
                print('Response status: ${response.statusCode}');
                print('Response body: ${response.body}');


                if (response.statusCode == 201){
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) {
                            return Availability();
                          }
                      )
                  );
                }
                else if(response.statusCode == 202){
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) {
                            return HomePage();
                          }
                      )
                  );
                }
              },
            )
          ],
        ),
      ),
    );
  }

  List<Widget> getCourses(){
    mCourses = [];
    for (var i = 1; i <= courseCount; i++) {
      codeControllers.add(TextEditingController());
      mCourses.add( Container(
        margin: EdgeInsets.only(top: 10.0, bottom: 10.0, left: 30.0, right: 30.0),
        padding: EdgeInsets.only(top: 10.0, left: 10.0),
        color: kPrimaryLightColor,
        child: StudentCourse(courseLabel: "Course $i", cController: codeControllers[i-1]),
      ));
    }
    if (courseCount > 1) {
      mCourses.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addCourse, iconSize: 40.0, color: kPrimaryColor),
              IconButton(icon: Icon(Icons.remove_circle_outline), onPressed: deleteCourse, iconSize: 40.0, color: kPrimaryColor)
            ],
          ));
    }
    else{
      mCourses.add(
              IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addCourse, iconSize: 40.0, color: kPrimaryColor),
          );
    }


    return mCourses;
  }
  void addCourse() {
    setState(() {
      courseCount = courseCount + 1;
    });
  }

  void deleteCourse() {
    setState(() {
      courseCount = courseCount - 1;
    });
  }
}