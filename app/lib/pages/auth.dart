import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:keacare/pages/login_page.dart';

const storage = FlutterSecureStorage();

class AuthService {
  final BuildContext context;

  AuthService(this.context);
  Future<void> handleUnauthorized() async {
  // Delete the JWT token and user email
  await storage.delete(key: 'jwt_token');
  await storage.delete(key: 'user_email');

  // Redirect the user to the login page (or main page, or wherever you handle re-authentication)
  Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const LoginPage()));  // Assuming you have a LoginPage widget for login
}

Future<void> logout() async {
  // Delete the JWT token and user email
  await storage.delete(key: 'jwt_token');
  await storage.delete(key: 'user_email');

  // Redirect the user to the main page or login page
  Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const LoginPage()));
}
}
