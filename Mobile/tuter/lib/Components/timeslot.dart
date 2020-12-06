import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:tuter/components/text_field_container.dart';
import 'package:tuter/constants.dart';
import 'package:intl/intl.dart';

  class TimeSlot extends StatefulWidget {

    final Function(DateTime) onDateTimeSelect;
    DateTime initialDateTime;
    TimeSlot({
      this.onDateTimeSelect,
      this.initialDateTime
    });
    @override
    TimeSlotState createState() => new TimeSlotState();
  }


  class TimeSlotState extends State<TimeSlot> {
    DateTime selectedDate = DateTime.now();
    TimeOfDay selectedTime = TimeOfDay.now();
    String selectedDuration = "1:00";
    bool isInitialDate = true;
    bool isInitialTime = true;

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
                        "Select:",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      SizedBox(width: 60.0),
                      Text(
                        "Selected Availability:",
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ]
                ),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      IconButton(icon: Icon(Icons.calendar_today), onPressed: ()=>selectDateAndTime(context), iconSize: 40.0,),
                      SizedBox(width: 30.0),
                      Container(
                        child: Text(getFormattedDate())
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

  selectDateAndTime (BuildContext context) async{
    await selectDate(context);
    await selectTime(context);
    widget.onDateTimeSelect(getSelectedDateTime());
  }

  selectDate (BuildContext context) async {
    if (isInitialDate && selectedDate != widget.initialDateTime) {
        selectedDate = widget.initialDateTime;
        isInitialDate = false;
      }
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime.now(),
        lastDate: DateTime(2025));
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
      });
  }

  selectTime (BuildContext context) async{
    TimeOfDay initTime = TimeOfDay.fromDateTime(widget.initialDateTime);
    if (isInitialTime && selectedTime != initTime) {
      selectedTime = initTime;
      isInitialTime = false;
    }
    final TimeOfDay picked = await showTimePicker(
        context: context,
        initialTime: selectedTime);
    if (picked != null && picked != selectedTime)
      setState(() {
        selectedTime = picked;
      });
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

  DateTime getSelectedDate() {
    return selectedDate;
  }

  TimeOfDay getSelectedTime() {
    return selectedTime;
  }

  DateTime getSelectedDateTime(){
    if (isInitialDate && isInitialTime)
      {
        DateTime combined = new DateTime(widget.initialDateTime.year,widget.initialDateTime.month,widget.initialDateTime.day,widget.initialDateTime.hour,widget.initialDateTime.minute);
        return combined;
      }
    DateTime combined = new DateTime(selectedDate.year,selectedDate.month,selectedDate.day,selectedTime.hour,selectedTime.minute);
    return combined;
  }

  String getFormattedDate(){
    DateTime dt = getSelectedDateTime();
    String formattedDate = DateFormat('MM-dd-yyyy – kk:mm').format(dt);
    return formattedDate;
  }
  }