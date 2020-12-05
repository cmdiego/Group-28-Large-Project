import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tuter/ProfileCreation/availability_creation.dart';
import 'package:tuter/ProfileCreation/course_schedule.dart';

void main() {

  Widget makeTestableWidget({Widget child}) {
    return MaterialApp(
        home: child
    );
  }

  testWidgets('Add and then subtract course', (WidgetTester tester) async {
    await tester.pumpWidget(makeTestableWidget(child: Availability()));

    expect(find.byIcon(Icons.add_circle_outline),findsOneWidget);

    await tester.tap(find.byIcon(Icons.add_circle_outline));
    await tester.pump();

    expect(find.byIcon(Icons.remove_circle_outline),findsOneWidget);

    await tester.tap(find.byIcon(Icons.remove_circle_outline));
    await tester.pump();

    expect(find.byIcon(Icons.add_circle_outline),findsOneWidget);

  });
}