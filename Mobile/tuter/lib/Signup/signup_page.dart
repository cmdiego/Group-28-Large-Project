import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Login/login_page.dart';

class SignUpPage extends StatelessWidget {
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
                    "SIGN-UP",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Your Email",
                    icon: Icons.person,
                    onChanged: (value) {},
                  ),
                  RoundedPasswordField(
                    hintText: "Password",
                    onChanged: (value) {},
                    hideText: true,
                  ),
                  RoundedPasswordField(
                    hintText: "Confirm Password",
                    onChanged: (value) {},
                    hideText: true
                  ),
                  RoundedButton(
                    text: "SIGNUP",
                    press: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) {
                                return EmailConfirmation();
                              }
                          )
                      );
                    },
                  ),
                  SizedBox(height: size.height * 0.03),
                  HaveOrDontHaveAccountCheck(
                    login: false,
                    press: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) {
                            return LoginPage();
                          }
                        )
                      );
                    }
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