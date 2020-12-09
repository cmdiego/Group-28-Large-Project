import 'dart:convert';

class Appts {
  List<Appt> appt;

  Appts({this.appt});

  Appts.fromJson(Map<String, dynamic> json) {
    if (json['appt'] != null) {
      appt = new List<Appt>();
      json['appt'].forEach((v) { appt.add(new Appt.fromJson(v)); });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.appt != null) {
      data['appt'] = this.appt.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Appt {
  String sId;
  String course;
  String tutorName;
  String studentName;
  String time;
  String studentEmail;
  String tutorEmail;
  String tutor;
  String student;
  int iV;

  Appt({this.sId, this.course, this.tutorName, this.studentName, this.time, this.studentEmail, this.tutorEmail, this.tutor, this.student, this.iV});

  Appt.fromJson(Map<String, dynamic> json) {
  sId = json['_id'];
  course = json['course'];
  tutorName = json['tutorName'];
  studentName = json['studentName'];
  time = json['time'];
  studentEmail = json['studentEmail'];
  tutorEmail = json['tutorEmail'];
  tutor = json['tutor'];
  student = json['student'];
  iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
  final Map<String, dynamic> data = new Map<String, dynamic>();
  data['_id'] = this.sId;
  data['class'] = this.course;
  data['tutorName'] = this.tutorName;
  data['studentName'] = this.studentName;
  data['time'] = this.time;
  data['studentEmail'] = this.studentEmail;
  data['tutorEmail'] = this.tutorEmail;
  data['tutor'] = this.tutor;
  data['student'] = this.student;
  data['__v'] = this.iV;
  return data;
  }
}
