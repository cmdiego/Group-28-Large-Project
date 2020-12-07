import 'package:flutter/material.dart';
import 'package:tuter/components/text_field_container.dart';
import 'package:tuter/constants.dart';

class StudentCourse extends StatelessWidget {
  final String courseLabel;
  final IconData icon;
  final ValueChanged<String> onChanged;
  final TextEditingController cController;
  const StudentCourse({
    Key key,
    this.courseLabel,
    this.icon,
    this.onChanged,
    this.cController,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Container(
      width: double.infinity,
      child: Stack(
        alignment: Alignment.topLeft,
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Row(
                  children: [
                    SizedBox(width: 1.0),
                    Text(
                      "$courseLabel",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                  children:[
                    SizedBox(width: 20.0),
                    Text(
                      "Subject Code and Course Number:",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    ]
                ),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      Container(
                        width: size.width * .60,
                        child: TextField(
                          decoration: InputDecoration(
                            hintText: "Ex. ENC 1102"
                          ),
                          controller: cController,
                        ),
                      ),
                    ]
                ),
                SizedBox(height: size.height * 0.03),
              ],
            ),
          ),
        ],
      ),
    );
  }
}