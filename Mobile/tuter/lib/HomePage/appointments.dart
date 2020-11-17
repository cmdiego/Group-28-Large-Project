import 'package:flutter/material.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/HomePage/home_page.dart';

class Appointments extends StatefulWidget {

  @override
  AppointmentsState createState() => new AppointmentsState();
}

class AppointmentsState extends State<Appointments>{
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return
      Scaffold(
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
            title: Text("My Appointments")),
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
      );
  }
}