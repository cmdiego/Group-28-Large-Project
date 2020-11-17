import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/multiline_textbox.dart';
import 'package:tuter/ProfileCreation/course_schedule.dart';

class ProfileInformation extends StatelessWidget {
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
                  SizedBox(height: size.height * 0.04),
                  Text(
                    "Please Complete your profile",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "First Name",
                    icon: Icons.account_box,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Last Name",
                    icon: Icons.account_box,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Gender Identification",
                    icon: Icons.group,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Language proficiencies",
                    icon: Icons.language,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Phone Number",
                    icon: Icons.phone,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  MultilineTextbox(
                    hintText: "Bio...",
                    icon: Icons.info,
                    onChanged: (value) {},
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedButton(
                    text: "Next",
                    press: () {
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