import 'package:flutter/material.dart';
import 'package:tuter/HomePage/view_profile.dart';

class EditProfile extends StatefulWidget {

  @override
  EditProfileState createState() => new EditProfileState();
}

class EditProfileState extends State<EditProfile>{
  @override
  Widget build(BuildContext context){
    Size size = MediaQuery.of(context).size;
    return
      Scaffold(
          appBar: AppBar(
            title: Text("Edit Profile"),
            actions: <Widget>[
              IconButton(
                  icon: Icon(Icons.check, color: Colors.white),
                  onPressed: (){
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) {
                              return ViewProfile();
                            }
                        )
                    );
                  })
            ],
          ),
          body: SingleChildScrollView(
          child: ConstrainedBox(
          constraints: BoxConstraints(minHeight: MediaQuery.of(context).size.height - kToolbarHeight),
              child: Container(
              margin: EdgeInsets.fromLTRB(15.0, 5.0, 15.0, 5.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      IconButton(
                        icon: Icon(Icons.image_outlined),
                        onPressed: null,
                        iconSize: 70.0,
                      ),
                      Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                                width: size.width * .5,
                                alignment: Alignment.center,
                                color: Colors.black12,
                                child: TextField(
                                    controller: TextEditingController(text: "Full Name")
                                )
                            ),
                            SizedBox(height: size.height * 0.01),
                            Container(
                                width: size.width * .5,
                                alignment: Alignment.center,
                                color: Colors.black12,
                                child: TextField(
                                    controller: TextEditingController(text: "School Name")
                                )
                            )
                          ]
                      )
                    ],
                  ),
                  Container(
                    height: size.height * .25,
                    color: Colors.black12,
                    child: ListView(
                      children: <Widget>[
                        ListTile(
                          leading: Icon(Icons.arrow_right),
                          title: Text('Course 1'),
                        ),
                        ListTile(
                          leading: Icon(Icons.arrow_right),
                          title: Text('Course 2'),
                        ),

                      ],
                    ),
                  ),
                  Container(
                    /*bio box*/
                    color: Colors.black12,
                    child: TextField(
                      minLines: 9,
                      maxLines: null,
                      controller: TextEditingController(text: "Hello, world"),
                      decoration: InputDecoration(
                          fillColor: Colors.white,
                          border: InputBorder.none
                      ),
                    ),
                  )
                ],
              )
          )
        )
          )
      );
  }
}