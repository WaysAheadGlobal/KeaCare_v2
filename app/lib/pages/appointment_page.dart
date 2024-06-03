import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:io' show Platform;

class AppointmentCard extends StatelessWidget {
  final Map<String, dynamic> appointment;
  final Future<Map<String, dynamic>> Function(int) fetchAppointmentDetails;

  const AppointmentCard({
    Key? key,
    required this.appointment,
    required this.fetchAppointmentDetails,
  }) : super(key: key);

  void openMap(String address) async {
  // Truncate the address at "Canada"
  final int canadaIndex = address.indexOf("Canada");
  final String truncatedAddress = (canadaIndex != -1) 
      ? address.substring(0, canadaIndex + "Canada".length) 
      : address;

  final Uri url = Uri.parse('https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent(truncatedAddress)}');

  // Try launching the Google Maps URL
  if (await canLaunchUrl(url)) {
    await launchUrl(url);
  } else {
    // Handle the situation where the URL cannot be launched
    print('Could not launch Google Maps for address: $truncatedAddress');
  }
}


  @override
  Widget build(BuildContext context) {
    // Use the existing layout for your AppointmentCard
    // Add a Directions button
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: ListTile(
        leading: appointment['careseekerImage'] != null && appointment['careseekerImage'].isNotEmpty 
  ? Image.network(
      appointment['careseekerImage'],
      width: 50,
      height: 50,
      fit: BoxFit.cover,
      errorBuilder: (context, error, stackTrace) {
        // Your error widget here
        return Icon(Icons.error_outline, size: 50);
      },
    )
  : Icon(Icons.person, size: 50), // Placeholder widget if the image URL is null

        title: Text(appointment['careseekerName'] ?? 'N/A'),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Date: ${appointment['date']}'),
            Text('Time: ${appointment['time']}'),
          ],
        ),
        trailing: IconButton(
          icon: Icon(Icons.directions),
          onPressed: () async {
            try {
              final details = await fetchAppointmentDetails(appointment['id']);
              openMap(details['address']);
            } catch (e) {
              print('Failed to get appointment details: $e');
            }
          },
        ),
      ),
    );
  }
}


class AppointmentPage extends StatefulWidget {
  const AppointmentPage({Key? key}) : super(key: key);

  @override
  _AppointmentPageState createState() => _AppointmentPageState();
}

class _AppointmentPageState extends State<AppointmentPage> {
  Future<List<Map<String, dynamic>>>? futureAppointments;
  final storage = const FlutterSecureStorage();

  @override
  void initState() {
    super.initState();
    fetchAppointments();
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

  Future<void> fetchAppointments() async {
    final headers = await getHeadersWithToken();
    final response = await http.get(
      Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/getappointments'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      setState(() {
        futureAppointments = Future.value((json.decode(response.body) as List)
            .map((e) => Map<String, dynamic>.from(e))
            .toList());
      });
    } else {
      throw Exception('Failed to load appointments');
    }
  }

  Future<Map<String, dynamic>> fetchAppointmentDetails(int appointmentId) async {
    final headers = await getHeadersWithToken();
    final response = await http.post(
      Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/getappointment'),
      headers: headers,
      body: json.encode({'appointmentId': appointmentId}),
    );

    if (response.statusCode == 200) {
      return json.decode(response.body)['data'];
    } else {
      throw Exception('Failed to load appointment details');
    }
  }

   @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: futureAppointments,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No appointments found'));
          } else {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final appointment = snapshot.data![index];
                return AppointmentCard(
                  appointment: appointment,
                  fetchAppointmentDetails: fetchAppointmentDetails,
                );
              },
            );
          }
        },
      ),
    );
  }
}