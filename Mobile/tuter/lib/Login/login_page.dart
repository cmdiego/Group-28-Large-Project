import 'package:flutter/material.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Signup/signup_page.dart';

class LoginPage extends StatefulWidget{
  @override
  LoginPageState createState() => new LoginPageState();
}
class LoginPageState extends State<LoginPage> {
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
                  onChanged: (value) {},
                ),
                RoundedPasswordField(
                  hintText: "Password",
                  onChanged: (value) {},
                  hideText: true,
                ),
                RoundedButton(
                  text: "LOGIN",
                  press: () {},
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