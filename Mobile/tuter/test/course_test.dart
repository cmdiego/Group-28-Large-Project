import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tuter/ProfileCreation/course_schedule.dart';

void main() {

  Widget makeTestableWidget({Widget child}) {
    return MaterialApp(
      home: child
    );
  }

  testWidgets('Add and then subtract course', (WidgetTester tester) async {
    await tester.pumpWidget(makeTestableWidget(child: CourseSchedule()));

    expect(find.byType(IconButton),findsOneWidget);

    await tester.tap(find.byType(IconButton));
    await tester.pump();

    expect(find.byType(IconButton),findsNWidgets(2));

    await tester.tap(find.byIcon(Icons.remove_circle_outline));
    await tester.pump();

    expect(find.byType(IconButton),findsOneWidget);

  });
}