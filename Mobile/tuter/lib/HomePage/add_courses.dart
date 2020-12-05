import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/HomePage/view_profile.dart';
import 'package:tuter/ProfileCreation/availability_creation.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/Components/student_course.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/constants.dart';

class AddCourses extends StatefulWidget {
  final List<dynamic> currentCourses;
  final String firstName;
  final String lastName;
  final String schoolName;
  final String email;
  final String bio;
  final bool isTutor;
  AddCourses({
    this.currentCourses,
    this.firstName,
    this.lastName,
    this.schoolName,
    this.email,
    this.bio,
    this.isTutor
  });
  @override
  AddCoursesState createState() => new AddCoursesState();
}

class AddCoursesState extends State<AddCourses>{
  List<Widget> mCourses = [];
  List<TextEditingController> codeControllers = [];
  int courseCount = -1;
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
              text: "Update Courses",
              press: () async{
                var courses = [];
                for (var i = 0; i < courseCount; i++){
                  var courseToAdd = codeControllers[i].text;
                  courses.add(courseToAdd);
                }
                SharedPreferences pref = await SharedPreferences.getInstance();
                bool isTutor = (pref.getBool("isTutor") ?? false);
                String jwt = (pref.getString('jwt') ?? "");

                var url = 'http://10.0.2.2:5000/auth/addCourses';
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

                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) {
                            return ViewProfile(
                              bio: widget.bio,
                              firstName: widget.firstName,
                              lastName: widget.lastName,
                              schoolName: widget.schoolName,
                              isTutor: widget.isTutor,
                              courses: courses,
                              email: widget.email,
                            );
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
    mCourses = [];
    if (courseCount == -1) {
        courseCount = widget.currentCourses.length + 1;
      }
    for (var i = 1; i <= courseCount; i++) {
      codeControllers.add(TextEditingController());
      mCourses.add( Container(
        margin: EdgeInsets.only(top: 10.0, bottom: 10.0, left: 30.0, right: 30.0),
        padding: EdgeInsets.only(top: 10.0, left: 10.0),
        color: kPrimaryLightColor,
        child: StudentCourse(courseLabel: "Course $i", cController: codeControllers[i-1]),
      ));
    }
    for (var j = 0; j < widget.currentCourses.length; j++){
      codeControllers[j].text = widget.currentCourses[j].toString();
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