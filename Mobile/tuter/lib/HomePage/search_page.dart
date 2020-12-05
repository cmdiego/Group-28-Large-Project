import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/tutor.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class SearchPage extends StatefulWidget {

  @override
  SearchPageState createState() => new SearchPageState();
}

class SearchPageState extends State<SearchPage>{

  String holder = '';
  String dropDownValue = 'Select Course';
  List<Widget> timeSlots = [];
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return
      Scaffold(
        backgroundColor: darkBackground,
        appBar: AppBar(
            leading: IconButton(
              icon: Icon(Icons.arrow_back_outlined, color: Colors.white),
              onPressed: (){
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) {
                          return HomePage();
                        }
                    )
                );},
            ),
            title: Text("Search")),
        body:
        Column(
          children: [
            Container(
              width: size.width * .4,
              child: DropdownButton<String>(
                iconEnabledColor: kPrimaryColor,
                iconDisabledColor: kPrimaryColor,
                dropdownColor: kPrimaryLightColor,
                hint: Text("${dropDownValue}", style: TextStyle(color: kPrimaryColor)),
                items: <String>["Course 1", "Course 2", "Course 3"].map((String val) {
                  return new DropdownMenuItem<String>(
                      value: val,
                      child: new Text(val)
                  );
                }).toList(),
                onChanged: (String data) async {
                  dropDownValue = data;
                  timeSlots = [];
                  var url = 'http://10.0.2.2:5000/auth/search';
                  var response = await http.post(url,
                      headers: {"content-type": "application/json"},
                      body: {"course": dropDownValue}
                  );
                  print('Response status: ${response.statusCode}');
                  print('Response body: ${response.body}');
                  print(dropDownValue);
                  setState(() {
                    dropDownValue = data;
                });},
              ),
            ),
            Flexible(child: ListView(
              children: [Container(
                height: size.height * 0.2,
                margin: EdgeInsets.all(10.0),
                color: kPrimaryLightColor,
                child: Tutor(),
              ),]
              /* timeSlots */
            ),)
          ],
        ),
      );
  }
}