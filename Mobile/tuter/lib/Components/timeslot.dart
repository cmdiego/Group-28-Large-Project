import 'package:flutter/material.dart';
import 'package:tuter/components/text_field_container.dart';
import 'package:tuter/constants.dart';

class TimeSlot extends StatefulWidget {
  @override
  TimeSlotState createState() => new TimeSlotState();
}
  class TimeSlotState extends State<TimeSlot> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final startTime = TimeOfDay(hour: 7, minute: 0);
    final endTime = TimeOfDay(hour: 6, minute: 30);
    final step = Duration(minutes: 30);

    final times = getTimes(startTime, endTime, step).map((tod) => tod.format(context)).toList();
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
                      "Available Period for Tutering",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      Text(
                        "Date:",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(width: 60.0),
                      Text(
                        "Start Time:",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(width: 60.0),
                      Text(
                        "Duration:",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ]
                ),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      IconButton(icon: Icon(Icons.calendar_today), onPressed: ()=>selectDate(context), iconSize: 40.0,),
                      SizedBox(width: 30.0),
                      Container(
                        width: size.width * .24,
                        child: DropdownButton<String>(
                          items: times.map((String value) {
                            return new DropdownMenuItem<String>(
                                value: value,
                                child: new Text(value)
                            );
                          }).toList(),
                          onChanged: (_) {},
                        ),
                      ),
                      SizedBox(width: 60.0),
                      Container(
                        width: size.width * .24,
                        child: DropdownButton<String>(
                          items: fifteenMinuteIncrements.map((String value) {
                            return new DropdownMenuItem<String>(
                                value: value,
                                child: new Text(value)
                            );
                          }).toList(),
                          onChanged: (_) {},
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

  selectDate (BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime.now(),
        lastDate: DateTime(2025));
  }

  Iterable<TimeOfDay> getTimes(TimeOfDay startTime, TimeOfDay endTime, Duration step) sync* {
    var hour = startTime.hour;
    var minute = startTime.minute;

    do {
      yield TimeOfDay(hour: hour, minute: minute);
      minute += step.inMinutes;
      while (minute >= 60) {
        minute -= 60;
        if (hour < 23) {
            hour++;
        }
        else {
          hour = 0;
        }
      }
    } while (hour != endTime.hour || minute != endTime.minute);
  }
}