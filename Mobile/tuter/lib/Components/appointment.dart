import 'package:flutter/material.dart';

class Appointment extends StatelessWidget {
  final String course;
  final String tutor;
  final DateTime date;
  final String duration;
  const Appointment({
    Key key,
    this.course,
    this.tutor,
    this.date,
    this.duration
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return  Stack(
        alignment: Alignment.topLeft,
        children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children:[
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Text(
                            "Course",
                          ),
                          Text(
                            "Date: 11/03",
                          ),

                        ],
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Text(
                            "Tutor",
                          ),
                          Text(
                            "Time: 8am - 5pm",
                          ),
                        ],
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          IconButton(icon: Icon(Icons.message), onPressed: null),
                          IconButton(icon: Icon(Icons.cancel_outlined), onPressed: null)
                        ],
                      ),
                    ]
                ),
        ],
    );
  }
}