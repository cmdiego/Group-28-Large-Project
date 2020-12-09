import 'dart:convert';

import 'appt.dart';

class ApptParent {
 List<Appt> appointment;

  ApptParent({this.appointment});
  factory ApptParent.fromJson(Map<String, dynamic> json) => _itemFromJson(json);
}

ApptParent _itemFromJson(Map<String, dynamic> json) {
  List<Appt> appointments = [];
  Map<String, dynamic> a = json["appt"];
  for (var i = 0; i < a.length; i++){
    appointments.add(Appt.fromJson(a));
  }
  return ApptParent(
      appointment: appointments
  );
}