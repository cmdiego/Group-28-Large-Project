import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/ProfileCreation/profile_information.dart';
import 'package:tuter/Signup/email_confirmation.dart';

class StudentOrTutor extends StatelessWidget {
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: Container(
        height: size.height,
        width: double.infinity,
        child: Stack(
          alignment: Alignment.center,
          children: <Widget>[
            SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    "Are you a:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedButton(
                    text: "TUTOR",
                    press: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) {
                                return ProfileInformation();
                              }
                          )
                      );
                    },
                  ),
                  SizedBox(height: size.height * 0.03),
                  Text(
                    "OR",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedButton(
                    text: "STUDENT",
                    press: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) {
                                return ProfileInformation();
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