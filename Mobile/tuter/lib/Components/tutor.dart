import 'package:flutter/material.dart';

class Tutor extends StatelessWidget {
  final String name;
  final String days;
  final String timeRange;
  final double rating;
  const Tutor({
    Key key,
    this.name,
    this.timeRange,
    this.days,
    this.rating
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
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
                      "Tutor: ",
                    ),
                    Text(
                      "Tutor Name",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    )
                  ],
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      Text(
                        "Days: MonTueWedThrFriSatSun",
                      ),
                      SizedBox(width: 10.0),
                      Text(
                        "Times: 8am - 5pm",
                      ),
                    ]
                ),
                SizedBox(height: size.height * 0.03),
                Row(
                    children:[
                      SizedBox(width: 20.0),
                      Text(
                        "Rating: "
                      ),
                      Row(
                      children: List.generate(5, (index) {
                        return index < 3 ? Icon(Icons.star) : Icon(Icons
                            .star_outline);
                      }
                      ),
                      )
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
}