import 'package:flutter/material.dart';
import 'package:tuter/components/text_field_container.dart';
import 'package:tuter/constants.dart';

class RoundedPasswordField extends StatefulWidget {
  final ValueChanged<String> onChanged;
  final String hintText;
  bool hideText;

  RoundedPasswordField({
    this.onChanged,
    this.hintText,
    this.hideText
  });
  @override
  RoundedPasswordFieldState createState() => new RoundedPasswordFieldState(
    onChanged: onChanged,
    hintText: hintText,
    hideText: hideText,
  );
}
class RoundedPasswordFieldState extends State<RoundedPasswordField>{
  final ValueChanged<String> onChanged;
  final String hintText;
  bool hideText;

  RoundedPasswordFieldState({
    this.onChanged,
    this.hintText,
    this.hideText
  });
  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: TextField(
        obscureText: hideText,
        onChanged: onChanged,
        cursorColor: kPrimaryColor,
        decoration: InputDecoration(
          hintText: hintText,
          icon: Icon(
            Icons.lock,
            color: kPrimaryColor,
          ),
          suffixIcon: IconButton(
            icon: Icon(
              Icons.visibility,
              color: kPrimaryColor,
            ),
            onPressed: (){
              setState(() {
                hideText = !hideText;
              });
            },
          ),
          border: InputBorder.none,
        ),
      ),
    );
  }
}