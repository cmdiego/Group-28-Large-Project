import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/ProfileCreation/student_or_tutor.dart';

class EmailConfirmation extends StatelessWidget {
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
                    "A confirmation code has been sent to your email",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Confirmation Code",
                    onChanged: (value) {},
                  ),
                  RoundedButton(
                    text: "SUBMIT",
                    press: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) {
                              return StudentOrTutor();
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