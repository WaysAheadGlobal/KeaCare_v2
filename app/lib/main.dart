import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:keacare/pages/home_page.dart'; // Replace with actual import
import 'package:keacare/pages/main_page.dart'; // Replace with actual import

const storage = FlutterSecureStorage();

Future<String?> loadToken() async {
  return await storage.read(key: 'jwt_token');
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final token = await loadToken();

  // Set the status bar color
  SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle(
    statusBarColor: Color.fromRGBO(119, 214, 208, 1), // Set any color you want
    statusBarIconBrightness: Brightness.light, // For Android (light icons)
    statusBarBrightness: Brightness.dark, // For iOS (dark icons)
  ));

  runApp(KeaCare(token: token));
}

class KeaCare extends StatelessWidget {
  final String? token;

  const KeaCare({Key? key, this.token}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KEA CARE',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.teal,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      // Use an initial route based on the presence of the token
      initialRoute: token != null ? '/main' : '/login',
      routes: {
        '/login': (context) => const HomePage(),  // Login Page
        '/main': (context) => WillPopScope(
          onWillPop: () async => false, // Prevent back button on main page
          child: const MainPage(),
        ),
      },
    );
  }
}
