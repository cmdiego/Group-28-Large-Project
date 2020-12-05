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

class SignUpPage extends StatefulWidget {
  @override
  SignUpPageState createState() => new SignUpPageState();
}

class SignUpPageState extends State<SignUpPage>{
  final emailController = TextEditingController();
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
                    "SIGN-UP",
                    style: TextStyle(fontWeight: FontWeight.bold, color: kPrimaryColor),
                  ),
                  SizedBox(height: size.height * 0.03),
                  RoundedInputField(
                    hintText: "Your Email",
                    icon: Icons.person,
                    controller: emailController,
                    onChanged: (value) {},
                  ),
                  RoundedPasswordField(
                    hintText: "Password",
                    onChanged: (value) {},

                    controller: passwordController,
                  ),
                  RoundedPasswordField(
                    hintText: "Confirm Password",
                    onChanged: (value) {},
                    controller: passwordCheckController,
                  ),
                  Container(
                    //color: kPrimaryLightColor,
                    width: size.width *.8,
                    child:  Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Radio(
                            value: false,
                              activeColor: kPrimaryColor,
                            groupValue: isTutor,
                            onChanged: (bool value){
                              setState((){
                                isTutor = value;
                              });
                            }
                          ),
                          Text("I'm a Student", style: TextStyle(color: kPrimaryLightColor)),
                          Radio(
                              value: true,
                              activeColor: kPrimaryColor,
                              groupValue: isTutor,
                              onChanged: (bool value){
                                setState((){
                                  isTutor = value;
                                });
                              }
                          ),
                          Text("I'm a Tutor",  style: TextStyle(color: kPrimaryLightColor),)
                        ]
                    ),
                  ),
                  RoundedButton(
                    text: "SIGNUP",
                    press: () async{
                      if (passwordController.text != passwordCheckController.text) {
                        // please make sure you passwords match
                      }
                      else{
                        var url = 'http://10.0.2.2:5000/auth/signup';
                        print('Email: ${emailController.text}');
                        print('Password: ${passwordController.text}');
                        print('Password: ${passwordCheckController.text}');
                        print('isTutor: ${isTutor}');
                        final SharedPreferences pref = await SharedPreferences.getInstance();
                        await pref.setBool("isTutor", isTutor);
                        var response = await http.post(url, headers: {"content-type": "application/json"}, body: jsonEncode({"email": emailController.text, "password": passwordController.text, "student": !isTutor, "tutor": isTutor}));
                        print('Response status: ${response.statusCode}');
                        print('Response body: ${response.body}');
                      }
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