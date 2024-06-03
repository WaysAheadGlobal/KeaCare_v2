class Job {
  var id;
  final String? imageUrl;
  final String additionalService;
  final String age;
  var availability;
  var comfortableWithPets;
  var experience;
  var hourlyRate;
  final String jobDescription;
  final String language;
  final String location;
  var rating;
  final String speciality;
  final String time;
  final String status;
  final String createdOn;
  final String modifiedOn;
  var  responses;
  final String fname;
  final String lname;

  Job({
    required this.id,
    this.imageUrl,
    required this.additionalService,
    required this.age,
    required this.availability,
    required this.comfortableWithPets,
    required this.experience,
    required this.hourlyRate,
    required this.jobDescription,
    required this.language,
    required this.location,
    required this.rating,
    required this.speciality,
    required this.time,
    required this.status,
    required this.createdOn,
    required this.modifiedOn,
    required this.responses,
    required this.fname,
    required this.lname
  });

  // Helper method to handle null strings
  String getSafeString(String? value, String defaultValue) {
    return value ?? defaultValue;
  }


}
