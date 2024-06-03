// all_jobs_page.dart
import 'package:flutter/material.dart';
import 'retrieve_jobs.dart'; // Ensure this file exists and contains the Job class definition
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'auth.dart'; // Ensure this file exists and has necessary authentication logic
import 'dart:convert';

class AllJobsPage extends StatefulWidget {
  final List<Job> jobs;

  const AllJobsPage({Key? key, required this.jobs}) : super(key: key);

  @override
  _AllJobsPageState createState() => _AllJobsPageState();
}

class _AllJobsPageState extends State<AllJobsPage> {
  final storage = FlutterSecureStorage();
  final Set<dynamic> appliedJobs = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('All Jobs'),
        backgroundColor: const Color.fromRGBO(0, 181, 168, 1),
      ),
      body: ListView.builder(
        itemCount: widget.jobs.length,
        itemBuilder: (context, index) {
          final job = widget.jobs[index];
          bool isApplied = appliedJobs.contains(job.id);
          return Card(
            margin: const EdgeInsets.all(10),
            child: Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${job.fname} ${job.lname}",
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
                  ),
                  Text("Speciality: ${job.speciality}"),
                  Text("Description: ${job.jobDescription}"),
                  Text("Hourly Rate: \$${job.hourlyRate}"),
                  Text("Experience: ${job.experience} years"),
                  Text("Rating: ${job.rating} stars"),
                  Text("Language: ${job.language}"),
                  Text("Location: ${job.location}"),
                  SizedBox(height: 8), // Optional: to give some spacing before the button
                  ElevatedButton(
                    onPressed: isApplied
                        ? null // Disable the button if already applied
                        : () async {
                            try {
                              String userEmail = await getUserEmail();
                              await applyForJob(job.id, userEmail, context);
                            } catch (e) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text(e.toString())),
                              );
                            }
                          },
                    child: Text(isApplied ? 'Applied' : 'Apply'),
                    style: ElevatedButton.styleFrom(
                      primary: const Color.fromRGBO(24, 188, 164, 1), // button color
                      onPrimary: Colors.white, // text color
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Future<void> applyForJob(var jobId, String userEmail, BuildContext context) async {
    final headers = await getHeadersWithToken();
    final url = 'https://webapi.waysdatalabs.com/keacare/api/caregiver/applyJob';
    final body = jsonEncode({"email": userEmail, "jobId": jobId.toString()});

    try {
      final response = await http.post(Uri.parse(url), headers: headers, body: body);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Applied for Job ID $jobId')),
        );
        setState(() {
          appliedJobs.add(jobId);
        });
      } else {
        final error = json.decode(response.body)['error'] ?? 'Failed to apply for the job';
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(error)),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('An exception occurred: $e')),
      );
    }
  }

  Future<Map<String, String>> getHeadersWithToken() async {
    String? token = await storage.read(key: 'jwt_token');
    if (token == null) {
      throw Exception('Token not found');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': '$token',
    };
  }

  Future<String> getUserEmail() async {
    String? userEmail = await storage.read(key: 'user_email');
    if (userEmail == null) {
      throw Exception('User email not found');
    }
    return userEmail;
  }
}
