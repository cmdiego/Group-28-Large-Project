import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/multiline_textbox.dart';
import 'package:tuter/ProfileCreation/course_schedule.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:tuter/constants.dart';

class ProfileInformation extends StatelessWidget {

  final String token;

  const ProfileInformation({
    Key key,
    this.token
  }) : super(key: key);

  @override
  Widget build(BuildContext context){
    final firstNameController = TextEditingController();
    final lastNameController = TextEditingController();
    final schoolNameController= TextEditingController();
    final bioController = TextEditingController();
;
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        height: size.height,
        width: double.infinity,
        color: darkBackground,
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(height: size.height * 0.04),
                  Text(
                    "Please Complete your profile",
                    style: TextStyle(fontWeight: FontWeight.bold, color: kPrimaryColor),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "First Name",
                    icon: Icons.account_box,
                    controller: firstNameController,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Last Name",
                    icon: Icons.account_box,
                    controller: lastNameController,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "School Name",
                    icon: Icons.school,
                    controller: schoolNameController,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  MultilineTextbox(
                    hintText: "Bio...",
                    icon: Icons.info,
                    controller: bioController,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedButton(
                    text: "Next",
                    press: () async{

                      var url = 'https://opentutor.herokuapp.com/auth/email-activate';
                      print('Email: ${firstNameController.text}');
                      print('Password: ${lastNameController.text}');
                      final SharedPreferences pref = await SharedPreferences.getInstance();

                      var response = await http.post(url,
                          headers: {"content-type": "application/json"},
                          body: jsonEncode({
                            "firstName": firstNameController.text,
                            "lastName": lastNameController.text,
                            "schoolName": schoolNameController.text,
                            "bioBox": bioController.text,
                            "token": token})
                      );
                      print('Response status: ${response.statusCode}');
                      print('Response body: ${response.body}');
                      var parsedJSON = jsonDecode(response.body);
                      String accessToken = parsedJSON['accessToken'];
                      await pref.setString('jwt', accessToken);
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) {
                                return CourseSchedule();
                              }
                          )
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}