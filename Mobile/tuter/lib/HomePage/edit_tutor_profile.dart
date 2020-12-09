import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/HomePage/add_availability.dart';
import 'package:tuter/HomePage/add_courses.dart';
import 'package:tuter/HomePage/change_password.dart';
import 'package:tuter/HomePage/view_profile.dart';
import 'package:tuter/constants.dart';
import 'package:http/http.dart' as http;

import 'view_tutor_profile.dart';

class EditTutorProfile extends StatefulWidget {

  final String bio;
  final String firstName;
  final String lastName;
  final String schoolName;
  final List<dynamic> courses;
  final List<dynamic> availability;
  final String email;
  EditTutorProfile({
    this.firstName,
    this.lastName,
    this.schoolName,
    this.courses,
    this.bio,
    this.email,
    this.availability
  });
  @override
  EditTutorProfileState createState() => new EditTutorProfileState();
}

class EditTutorProfileState extends State<EditTutorProfile>{
  @override
  Widget build(BuildContext context){
    TextEditingController bioController = TextEditingController(text: widget.bio);
    Size size = MediaQuery.of(context).size;
    return
      Scaffold(
          backgroundColor: darkBackground,
          appBar: AppBar(
            title: Text("Edit Profile"),
            actions: <Widget>[
              IconButton(
                  icon: Icon(Icons.check, color: Colors.white),
                  onPressed: () async{

                    var url = 'https://opentutor.herokuapp.com/auth/bioBox';
                    SharedPreferences pref = await SharedPreferences.getInstance();
                    String jwt = (pref.getString('jwt') ?? "");
                    var response = await http.post(url,
                        headers: {"content-type": "application/json",
                          "Authorization": jwt},
                        body: jsonEncode({"oo":"${bioController.text}"})
                    );
                    print('Response status: ${response.statusCode}');
                    print('Response body: ${response.body}');

                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) {
                              return ViewTutorProfile(
                                bio: bioController.text,
                                firstName: widget.firstName,
                                lastName: widget.lastName,
                                schoolName: widget.schoolName,
                                courses: widget.courses,
                                email: widget.email,
                                availability: widget.availability,
                              );
                            }
                        )
                    );
                  })
            ],
          ),
          body: SingleChildScrollView(
              child: ConstrainedBox(
                  constraints: BoxConstraints(minHeight: MediaQuery.of(context).size.height - kToolbarHeight),
                  child: Container(
                      margin: EdgeInsets.fromLTRB(15.0, 5.0, 15.0, 5.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              IconButton(
                                icon: Icon(Icons.image_outlined, color: kPrimaryColor),
                                onPressed: null,
                                iconSize: 70.0,
                              ),
                              Column(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      width: size.width * .5,
                                      alignment: Alignment.center,
                                      color: kPrimaryLightColor,
                                      child: Text("${widget.firstName} ${widget.lastName}"),
                                    ),
                                    SizedBox(height: size.height * 0.01),
                                    Container(
                                      width: size.width * .5,
                                      alignment: Alignment.center,
                                      color: kPrimaryLightColor,
                                      child: Text("${widget.schoolName}"),
                                    ),
                                    SizedBox(height: size.height * 0.01),
                                    Container(
                                        child: new RichText(
                                          text: TextSpan(
                                            text: 'Change Password',
                                            style: new TextStyle(color: Colors.blue),
                                            recognizer: new TapGestureRecognizer()
                                              ..onTap = () {
                                                Navigator.push(
                                                    context,
                                                    MaterialPageRoute(
                                                        builder: (context) {
                                                          return ChangePassword();
                                                        }
                                                    )
                                                );
                                              },
                                          ),
                                        )
                                    )
                                  ]
                              )
                            ],
                          ),
                          Container(
                            height: size.height * .25,
                            color: kPrimaryLightColor,
                            child: ListView(
                                children: getCourses()
                            ),
                          ),
                          SizedBox(height: size.height * 0.025),
                          Container(
                            height: size.height * .25,
                            color: kPrimaryLightColor,
                            child: ListView(
                                children: getAvailability()
                            ),
                          ),
                          SizedBox(height: size.height * 0.025),
                          Container(
                            /*bio box*/
                            color: kPrimaryLightColor,
                            child: TextField(
                              cursorColor: kPrimaryColor,
                              minLines: 9,
                              maxLines: null,
                              controller: bioController,
                              decoration: InputDecoration(
                                  fillColor: Colors.white,
                                  border: InputBorder.none
                              ),
                            ),
                          )
                        ],
                      )
                  )
              )
          )
      );
  }

  List<Widget> getCourses(){
    List<dynamic> courses = widget.courses;
    List<Widget> courseWidgets = [];
    for (var i = 0; i < courses.length; i++)
    {
      String name = courses[i].toString();
      courseWidgets.add( ListTile(
        leading: Icon(Icons.arrow_right),
        title: Text(name),
      ),);
    }
    courseWidgets.add(IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addCourse, iconSize: 40.0, color: kPrimaryColor));
    return courseWidgets;
  }

  List<Widget> getAvailability(){
    List<dynamic> availability = widget.availability;
    List<Widget> timeslotWidgets = [];
    for (var i = 0; i < availability.length; i++)
    {
      String name = availability[i].toString();
      timeslotWidgets.add( ListTile(
        leading: Icon(Icons.arrow_right),
        title: Text(name),
      ),);
    }
    timeslotWidgets.add(IconButton(icon: Icon(Icons.add_circle_outline), onPressed: addAvailability, iconSize: 40.0, color: kPrimaryColor));
    return timeslotWidgets;
  }

  void addCourse(){
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) {
              return AddCourses(
                currentCourses: widget.courses,
                firstName: widget.firstName,
                lastName: widget.lastName,
                bio: widget.bio,
                schoolName: widget.schoolName,
                email: widget.email,
                availability: widget.availability,
                isTutor: true,
              );
            }
        )
    );
  }

  void addAvailability(){
    Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) {
              return AddAvailability(
                currentAvailability: widget.availability,
                firstName: widget.firstName,
                lastName: widget.lastName,
                bio: widget.bio,
                schoolName: widget.schoolName,
                email: widget.email,
              );
            }
        )
    );
  }
}