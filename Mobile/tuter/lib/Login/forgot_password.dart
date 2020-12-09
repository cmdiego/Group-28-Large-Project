import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/Signup/email_confirmation.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Login/login_page.dart';
import 'package:http/http.dart' as http;
import 'package:tuter/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ForgotPassword extends StatefulWidget {
  @override
  ForgotPasswordState createState() => new ForgotPasswordState();
}

class ForgotPasswordState extends State<ForgotPassword>{
  final emailController = TextEditingController();
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
                    "Please enter your email below",
                    style: TextStyle(fontWeight: FontWeight.bold, color: kPrimaryColor),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Your Email",
                    icon: Icons.person,
                    controller: emailController,
                    onChanged: (value) {},
                  ),

                  RoundedButton(
                    text: "Send Email",
                    press: () async{
                        var url = 'https://opentutor.herokuapp.com/auth/request-password';
                        print('Email: ${emailController.text}');
                        print('isTutor: ${isTutor}');
                        final SharedPreferences pref = await SharedPreferences.getInstance();
                        await pref.setBool("isTutor", isTutor);
                        var response = await http.post(url, headers: {"content-type": "application/json"}, body: jsonEncode({"email": emailController.text}));
                        print('Response status: ${response.statusCode}');
                        print('Response body: ${response.body}');

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