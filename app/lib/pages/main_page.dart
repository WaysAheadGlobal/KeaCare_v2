import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'message_page.dart'; // Replace with your actual imports
import 'main_page_home.dart'; // Replace with your actual imports
import 'appointment_page.dart'; // Replace with your actual imports

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _selectedIndex = 0;
  String? profileImageUrl;
  String? userEmail;
  late List<Widget> _pages;
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final FlutterSecureStorage storage = const FlutterSecureStorage();

  @override
  void initState() {
    super.initState();
    fetchCaregiverInfo();
    fetchUserEmail();

    _pages = [
      MainPageHome(),
      ContactsPage(),
      AppointmentPage(),
    ];
  }

  void fetchUserEmail() async {
    String? email = await storage.read(key: 'user_email');
    // Use setState to update the userEmail
    if (email != null) {
      setState(() {
        userEmail = email; // Now this should not give a red line
      });
    }
  }




  Future<void> fetchCaregiverInfo() async {
    try {
      String? email = await storage.read(key: 'user_email');
      String? token = await storage.read(key: 'jwt_token');
      if (email != null && token != null) {
        final response = await http.get(
          Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/getCaregiverInfo?email=$email'),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': '$token',
          },
        );

        if (response.statusCode == 200) {
          final data = json.decode(response.body);
          setState(() {
            profileImageUrl = data['imageUrl'];
          });
        } else {
          throw Exception('Failed to load caregiver info');
        }
      }
    } catch (e) {
      print('Error fetching caregiver info: $e');
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(
          actions: [
            Container(
              margin: EdgeInsets.only(right: MediaQuery.of(context).size.height * 0.01),
              child: CircleAvatar(
                backgroundImage: (profileImageUrl != null && profileImageUrl!.isNotEmpty)
    ? NetworkImage(profileImageUrl!)
    : const AssetImage('assets/default_avatar.png') as ImageProvider,
                radius: MediaQuery.of(context).size.width * 0.050,
              ),
            ),
          ],
          leading: IconButton(
            onPressed: () {
              _scaffoldKey.currentState?.openDrawer();
            },
            icon: const Icon(Icons.menu),
          ),
          backgroundColor: const Color.fromRGBO(0, 181, 168, 1),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.message),
              label: 'Messages',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.event_note),
              label: 'Appointments',
            ),
          ],
          currentIndex: _selectedIndex,
          selectedItemColor: const Color.fromRGBO(0, 181, 168, 1),
          onTap: _onItemTapped,
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero, // Important to set to zero to avoid any default padding
            children: [
              UserAccountsDrawerHeader(
                accountName: null, // No name to display, set to null
                accountEmail: Text(userEmail ?? 'Loading...'), // Display the user's email here
                currentAccountPicture: CircleAvatar(
                  backgroundImage: (profileImageUrl != null && profileImageUrl!.isNotEmpty)
    ? NetworkImage(profileImageUrl!)
    : const AssetImage('assets/default_avatar.png') as ImageProvider,
                ),
                decoration: BoxDecoration(
                  color: Color.fromRGBO(0, 181, 168, 1),
                ),
              ),
              ListTile(
                leading: Icon(Icons.info),
                title: Text('About Us'),
                onTap: () {
                  // Navigate to the About Us page
                },
              ),
              ListTile(
                leading: Icon(Icons.support_agent),
                title: Text('Contact Support'),
                onTap: () {
                  // Navigate to the Contact Support page
                },
              ),
              ListTile(
                leading: const Icon(Icons.logout),
                title: const Text('Logout'),
                onTap: () async {
                  await storage.deleteAll(); // Clear all secure storage items
                  Navigator.of(context).pop(); // Close the drawer
                  Navigator.of(context).pushReplacementNamed('/login'); // Navigate to the login screen
                },
              ),
            ],
          ),
        ),
        backgroundColor: Color.fromRGBO(255, 255, 255, 1),
        body: SafeArea(
          child: IndexedStack(
            index: _selectedIndex,
            children: _pages,
          ),
        ),
      ),
    );
  }
}
