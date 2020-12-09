import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/HomePage/view_profile.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Login/login_page.dart';
import 'package:http/http.dart' as http;
import 'package:tuter/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ResetPassword extends StatefulWidget {
  final String token;
  ResetPassword({
    this.token
});
  @override
  ResetPasswordState createState() => new ResetPasswordState();
}

class ResetPasswordState extends State<ResetPassword>{
  final passwordController = TextEditingController();
  final passwordCheckController = TextEditingController();
  bool isTutor;
  @override
  Widget build(BuildContext context){
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
                  Text(
                    "Change Password",
                    style: TextStyle(fontWeight: FontWeight.bold, color: kPrimaryColor),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedPasswordField(
                    hintText: "New Password",
                    onChanged: (value) {},

                    controller: passwordController,
                  ),
                  RoundedPasswordField(
                    hintText: "Confirm New Password",
                    onChanged: (value) {},
                    controller: passwordCheckController,
                  ),
                  RoundedButton(
                    text: "Change Password",
                    press: () async{
                      if (passwordController.text != passwordCheckController.text) {
                        // please make sure you passwords match
                      }
                      else{
                        var url = 'https://opentutor.herokuapp.com/auth/reset-password';
                        var response = await http.post(url,
                            headers: {"content-type": "application/json"},
                            body: jsonEncode({"token": widget.token, "password":"${passwordController.text}"})
                        );
                        print('Response status: ${response.statusCode}');
                        print('Response body: ${response.body}');
                      }
                      Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) {
                                return LoginPage();
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