import 'package:flutter/material.dart';
import 'package:tuter/Components/appointment.dart';
import 'package:tuter/Components/tutor.dart';
import 'package:tuter/HomePage/home_page.dart';

class SearchPage extends StatefulWidget {

  @override
  SearchPageState createState() => new SearchPageState();
}

class SearchPageState extends State<SearchPage>{
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
            title: Text("Search")),
        body:
        Column(
          children: [
            Container(
              width: size.width * .4,
              child: DropdownButton<String>(
                hint: Text("Select Course"),
                items: <String>["Course 1", "Course 2", "Course 3"].map((String value) {
                  return new DropdownMenuItem<String>(
                      value: value,
                      child: new Text(value)
                  );
                }).toList(),
                onChanged: (_) {},
              ),
            ),
            Flexible(child: ListView(
              children: [
                Container(
                  height: size.height * 0.2,
                  margin: EdgeInsets.all(10.0),
                  color: Colors.black12,
                  child: Tutor(),
                ),
              ],
            ),)
          ],
        ),
      );
  }
}