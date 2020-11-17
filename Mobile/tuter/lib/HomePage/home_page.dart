import 'package:flutter/material.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/rounded_button.dart';
import 'package:tuter/Components/tutor.dart';
import 'package:tuter/HomePage/edit_profile.dart';
import 'package:tuter/HomePage/appointments.dart';
import 'package:tuter/constants.dart';
import 'package:tuter/HomePage/search_page.dart';
import 'package:tuter/HomePage/view_profile.dart';

class HomePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
          leading: IconButton(
            icon: Icon(Icons.person_outline, color: Colors.white),
            onPressed: (){
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) {
                      return ViewProfile();
                    }
                )
            );},
          ),
          title: Text("Tuter"),
          actions: <Widget>[
            IconButton(
                icon: Icon(Icons.search, color: Colors.white),
                onPressed: (){
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) {
                        return SearchPage();
                      }
                    )
                  );
                })
          ],
      ),
      body: ListView(
        children: [
          Container(
            height: size.height * 0.2,
            margin: EdgeInsets.all(10.0),
            color: Colors.black12,
            child: Appointment(),
          ),
        ],
      ),
      /*endDrawer: Drawer(
        // Add a ListView to the drawer. This ensures the user can scroll
        // through the options in the drawer if there isn't enough vertical
        // space to fit everything.
        child: ListView(
          // Important: Remove any padding from the ListView.
          padding: EdgeInsets.zero,
          children: <Widget>[
            Container(
                height: 120.0,
                child: DrawerHeader(
                decoration: BoxDecoration(
                  color: kPrimaryLightColor,
                ),
                margin: EdgeInsets.only(bottom: 2.0),
                padding: EdgeInsets.fromLTRB(6.0, 6.0, 6.0, 2.0)
            ),
            ),
            RoundedButton(
              text: 'My Appointments',
              press: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return Appointments();
                    }
                  )
                );
              }
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                  RaisedButton(
                    onPressed: (){},
                    color: Colors.deepPurpleAccent,
                    child: Text("Course 1"),
                    padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                  ),
                  RaisedButton(
                    onPressed: (){},
                    color: Colors.deepPurpleAccent,
                    child: Text("Course 2"),
                    padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                  ),
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    RaisedButton(
                      onPressed: (){},
                      color: Colors.deepPurpleAccent,
                      child: Text("Course 3"),
                      padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                    ),
                    RaisedButton(
                      onPressed: (){},
                      color: Colors.deepPurpleAccent,
                      child: Text("Course 4"),
                      padding: EdgeInsets.fromLTRB(40.0, 40.0, 40.0, 40.0),
                    ),
                  ],
                )
              ],
            ),
            ListTile(
              title: Text('Advanced Search'),
              onTap: () {
                // Update the state of the app
                // ...
                // Then close the drawer
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ), */
    );
  }
}