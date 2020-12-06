import 'package:flutter/material.dart';
import 'package:tuter/HomePage/edit_profile.dart';
import 'package:tuter/HomePage/home_page.dart';
import 'package:tuter/constants.dart';

class ViewProfile extends StatefulWidget {
  final String firstName;
  final String lastName;
  final String schoolName;
  final String email;
  final List<dynamic> courses;
  final String bio;
  ViewProfile({
    this.firstName,
    this.lastName,
    this.schoolName,
    this.email,
    this.courses,
    this.bio
  });
  @override
  ViewProfileState createState() => new ViewProfileState();
}

class ViewProfileState extends State<ViewProfile>{
  @override
  Widget build(BuildContext context) {
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
            title: Text("My Profile"),
            actions: <Widget>[
              IconButton(
                  icon: Icon(Icons.settings_outlined, color: Colors.white),
                onPressed: (){
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) {
                            return EditProfile(
                              firstName: widget.firstName,
                              lastName: widget.lastName,
                              bio: widget.bio,
                              courses: widget.courses,
                              schoolName: widget.schoolName,
                              email: widget.email,
                            );
                          }
                      )
                  );
                })
            ],
        ),
        body:
         Container(
              margin: EdgeInsets.fromLTRB(15.0, 5.0, 15.0, 5.0),
              child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
               Row(
                 mainAxisAlignment: MainAxisAlignment.spaceAround,
                 children: [
                   IconButton(
                     icon: Icon(Icons.image_outlined, color: kPrimaryColor),
                     onPressed: null,
                     iconSize: 70.0,
                   ),
                   Column(
                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                     children: [
                       Container(
                         width: size.width * .5,
                         alignment: Alignment.center,
                         color: kPrimaryLightColor,
                         child: Text("${widget.firstName} ${widget.lastName}")
                       ),
                       SizedBox(height: size.height * 0.01),
                       Container(
                         width: size.width * .5,
                         alignment: Alignment.center,
                         color: kPrimaryLightColor,
                         child: Text("${widget.schoolName}")
                       )
                     ]
                 )
               ],
             ),
             Container(
               height: size.height * .25,
               color: kPrimaryLightColor,
               child: ListView(
                 children: getCourses()
               ),
             ),
             Container(
               /*bio box*/
               color: kPrimaryLightColor,
               child: TextField(
                 readOnly: true,
                 minLines: 9,
                 maxLines: null,
                 controller: TextEditingController(text: widget.bio),
                 decoration: InputDecoration(
                   fillColor: Colors.white,
                   border: InputBorder.none
                 ),
               ),
             )
           ],
          )
        )
      );
  }

  List<Widget> getCourses(){
    List<dynamic> courses = widget.courses;
    List<Widget> courseWidgets = [];
    for (var i = 0; i < courses.length; i++)
      {
        String name = courses[i].toString();
        courseWidgets.add( ListTile(
          leading: Icon(Icons.arrow_right),
          title: Text(name),
        ),);
      }
    return courseWidgets;
  }

}