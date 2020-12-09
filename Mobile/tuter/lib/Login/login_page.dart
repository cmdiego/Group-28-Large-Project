import 'dart:convert';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/rounded_input_field.dart';
import 'package:tuter/Components/rounded_password_field.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/HomePage/tutor_home_page.dart';
import 'package:tuter/Login/forgot_password.dart';
import 'package:tuter/components/donthave_or_alreadyhave_account.dart';
import 'package:tuter/Signup/signup_page.dart';
import 'package:http/http.dart' as http;
import 'package:tuter/constants.dart';


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
      color: darkBackground,
      child: Stack(
        alignment: Alignment.center,
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "LOGIN",
                  style: TextStyle(fontWeight: FontWeight.bold,color: kPrimaryColor),
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
                Container(
                    child: new RichText(
                      text: TextSpan(
                        text: 'Forgot your password?',
                        style: new TextStyle(color: Colors.blue),
                        recognizer: new TapGestureRecognizer()
                          ..onTap = () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) {
                                      return ForgotPassword();
                                    }
                                )
                            );
                          },
                      ),
                    )
                ),
                RoundedButton(
                  text: "LOGIN",
                  press:  () async{
                    var url = 'https://opentutor.herokuapp.com/auth/signin';
                    print('Email: ${emailController.text}');
                    print('Password: ${passwordController.text}');
                    final SharedPreferences pref = await SharedPreferences.getInstance();
                    var response = await http.post(url, headers: {"content-type": "application/json"}, body: jsonEncode({"email": emailController.text, "password": passwordController.text}));
                    print('Response status: ${response.statusCode}');
                    print('Response body: ${response.body}');
                    var parsedJSON = jsonDecode(response.body);
                    String accessToken = parsedJSON['accessToken'];
                    await pref.setString('jwt', accessToken);
                    Map<String, dynamic> jsonDecoded = parseJwt(accessToken);
                    print("JWT:");
                    print(jsonDecoded.toString());
                    print(jsonDecoded['user'].toString());
                    print(jsonDecoded['user']['isTutor'].toString());
                    bool isTutor = jsonDecoded['user']['isTutor'];
                    if (response.statusCode == 200)
                      {
                        if(isTutor){
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return TutorHomePage();
                              },
                            ),
                          );
                        }
                        else{
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) {
                                return HomePage();
                              },
                            ),
                          );
                        }

                      }
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

  Map<String, dynamic> parseJwt(String token) {
    final parts = token.split('.');
    if (parts.length != 3) {
      throw Exception('invalid token');
    }

    final payload = _decodeBase64(parts[1]);
    final payloadMap = json.decode(payload);
    if (payloadMap is! Map<String, dynamic>) {
      throw Exception('invalid payload');
    }

    return payloadMap;
  }

  String _decodeBase64(String str) {
    String output = str.replaceAll('-', '+').replaceAll('_', '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw Exception('Illegal base64url string!"');
    }

    return utf8.decode(base64Url.decode(output));
  }
}