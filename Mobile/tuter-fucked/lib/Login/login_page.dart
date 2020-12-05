import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Signup/signup_page.dart';
import 'package:http/http.dart' as http;


class LoginPage extends StatefulWidget{
  @override
  LoginPageState createState() => new LoginPageState();
}
class LoginPageState extends State<LoginPage> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
  return Scaffold(
    body: Container(
      width: double.infinity ,
      height: size.height,
      child: Stack(
        alignment: Alignment.center,
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "LOGIN",
                  style: TextStyle(fontWeight: FontWeight.bold),
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
                  controller: passwordController,
                  onChanged: (value) {},
                ),
                RoundedButton(
                  text: "LOGIN",
                  press:  () async{
                    var url = 'http://10.0.2.2:5000/auth/signin';
                    print('Email: ${emailController.text}');
                    print('Password: ${passwordController.text}');
                    var response = await http.post(url, headers: {"content-type": "application/json"}, body: jsonEncode({"email": emailController.text, "password": passwordController.text}));
                    print('Response status: ${response.statusCode}');
                    print('Response body: ${response.body}');
                  },
                ),
                SizedBox(height: size.height * 0.03),
                HaveOrDontHaveAccountCheck(
                  press: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return SignUpPage();
                        },
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      )
    ),
  );
}
}