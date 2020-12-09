import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/searchedTutor.dart';
import 'package:tuter/Components/tutor.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/constants.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class SearchPage extends StatefulWidget {
  final List<String> courses;

  SearchPage({
    this.courses
  });
  @override
  SearchPageState createState() => new SearchPageState();
}

class SearchPageState extends State<SearchPage>{

  String holder = '';
  String dropDownValue = 'Select Course';
  List<Widget> timeSlots = [];
  List<SearchedTutor> tutors = [];
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
                items: widget.courses.map((String val) {
                  return new DropdownMenuItem<String>(
                      value: val,
                      child: new Text(val)
                  );
                }).toList(),
                onChanged: (String data) async {
                  dropDownValue = data;
                  timeSlots = [];
                  tutors = [];
                  SharedPreferences pref = await SharedPreferences.getInstance();
                  String jwt = (pref.getString('jwt') ?? "");
                  var url = 'https://opentutor.herokuapp.com/auth/checkUserTutorCourse';
                  var response = await http.post(url,
                      headers: {"content-type": "application/json","Authorization": jwt},
                      body: jsonEncode({"studentCourse": dropDownValue})
                  );
                  print('Response status: ${response.statusCode}');
                  print('Response body: ${response.body}');
                  var parsedJSON = jsonDecode(response.body);
                  List<dynamic> courseUsers = parsedJSON['tut'];
                  print("courseUsers: ${courseUsers}");
                  print("${courseUsers.length}");
                  for (var i = 0; i < courseUsers.length; i++) {
                    var currentTutor = jsonEncode(courseUsers[i]);
                    print(currentTutor);
                    var parse2 = jsonDecode(currentTutor);
                    String id = parse2["user"];
                    var url = 'http://opentutor.herokuapp.com/auth/getTutorInfo';
                    var response = await http.post(url,
                        headers: {"content-type": "application/json","Authorization": jwt},
                        body: jsonEncode({"tempID": id})
                    );
                    print('Response status: ${response.statusCode}');
                    print('Response body: ${response.body}');
                    var parsedJSON = jsonDecode(response.body);
                    String firstName = parsedJSON["firstName"];
                    String lastName = parsedJSON["lastName"];
                    String email = parsedJSON["email"];
                    print("${firstName} ${lastName} ${email}");
                    tutors.add(new SearchedTutor(
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      id: id
                    ));
                  }
                  print("TL: ${tutors.length}");
                  print("Tutors: ${tutors}");
                  for (var j = 0; j < tutors.length; j++) {
                      String id = tutors[j].id;
                      var url = 'http://opentutor.herokuapp.com/auth/getTutorAvailability';
                      var response = await http.post(url,
                          headers: {"content-type": "application/json","Authorization": jwt},
                          body: jsonEncode({"tempID": id})
                      );
                      print('Response status: ${response.statusCode}');
                      print('Response body: ${response.body}');
                      var parsedJSON = jsonDecode(response.body);
                      List<dynamic> datesDynamic = parsedJSON["date"];
                      List<DateTime> dates = [];
                      for (var z = 0; z < datesDynamic.length; z++){
                        dates.add(DateTime.parse(datesDynamic[z].toString()));
                      }
                      for (var y = 0; y < dates.length; y++) {
                        print("Tutor to add for: ${tutors[j].firstName}");
                        timeSlots.add(Container(
                            height: size.height * 0.2,
                            margin: EdgeInsets.all(10.0),
                            color: kPrimaryLightColor,
                            child: Tutor(
                                firstName: tutors[j].firstName,
                                lastName: tutors[j].lastName,
                                email: tutors[j].email,
                                date: dates[y],
                                otherTimes: getOtherDates(dates, dates[y]),
                                tutorID: id,
                                course: dropDownValue,
                        )));
                      }



                    }
                  /*

                    String id = parse2["userID"];
                    tutors.add(new SearchedTutor(firstName: firstName, lastName: lastName, email: email, id: id));
                    print(tutors[i].firstName);
                  */

                  print(dropDownValue);


                  setState(() {
                    dropDownValue = data;
                });},
              ),
            ),
            Flexible(child: ListView(
              children: timeSlots
            ),)
          ],
        ),
      );
  }

  List<DateTime> getOtherDates(List<DateTime> ref, DateTime toPull){
    List<DateTime> others = [];
    for (var i = 0; i < ref.length; i++) {
        others.add(ref[i]);
    }
    others.remove(toPull);
    return others;
  }
}