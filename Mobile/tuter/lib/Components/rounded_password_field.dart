import 'package:flutter/material.dart';
import 'package:tuter/components/text_field_container.dart';
import 'package:tuter/constants.dart';

class RoundedPasswordField extends StatefulWidget {
  final ValueChanged<String> onChanged;
  final String hintText;
  final TextEditingController controller;
  RoundedPasswordField({
    this.onChanged,
    this.hintText,
    this.controller
  });
  @override
  RoundedPasswordFieldState createState() => new RoundedPasswordFieldState();
}
class RoundedPasswordFieldState extends State<RoundedPasswordField>{
  bool hideText = true;
  @override
  Widget build(BuildContext context) {
    return TextFieldContainer(
      child: TextField(
        obscureText: hideText,
        onChanged: widget.onChanged,
        cursorColor: kPrimaryColor,
        controller: widget.controller,
        decoration: InputDecoration(
          hintText: widget.hintText,
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