import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:keacare/pages/main_page.dart';
import 'package:http/http.dart' as http;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/services.dart';
import 'package:keacare/models/user.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final storage = const FlutterSecureStorage();
  late TextEditingController _emailIDController;
  

  @override
  void initState() {
    _emailIDController = TextEditingController();
    super.initState();
  }

  


  Future<String?> getGoogleClientIdFromNative() async {
    const platform = MethodChannel('com.example.app/secrets');
    String? clientId;
    try {
      clientId = await platform.invokeMethod('getGoogleClientID');
    } catch (error) {
      print(error);
    }
    return clientId;
  }

  Future<void> _handleGoogleSignIn() async {
  try {
    final clientId = await getGoogleClientIdFromNative();
    final GoogleSignIn googleSignIn = GoogleSignIn(
      scopes: ['email', 'profile'],
      clientId: clientId,
    );

    final GoogleSignInAccount? account = await googleSignIn.signIn();
    if (account != null) {
      final GoogleSignInAuthentication googleAuth = await account.authentication;
      final String? googleJWT = googleAuth.idToken;

      if (googleJWT != null) {
        var body = {
          'token': googleJWT,
        };
        
        var headers = {'Content-Type': 'application/json'};

        // Send the Google JWT to your backend to exchange it for your app's JWT
        var response = await http.post(Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/google-login'), headers: headers, body: jsonEncode(body));

        if (response.statusCode == 200) {
          Map<String, dynamic> responseBody = jsonDecode(response.body);
          User user = User.fromJson(responseBody);
          if (user.success) {
            await storage.write(key: 'jwt_token', value: user.jwtToken);
            await storage.write(key: 'user_email', value: user.email);  // Save email address
            print("Authenticated successfully with JWT!");

            // Navigate to HomePage after successful authentication
            Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const MainPage()));

          } else {
            print("Token was not found in the response!");
          }
        } else {
          print("Authentication failed!");
        }
      }
    }
  } catch (error) {
    print("Error occurred during Google sign in: $error");
  }
}

  Future<String?> getUserEnteredOTP(BuildContext context) async {
  TextEditingController otpController = TextEditingController();
  return showDialog<String>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          alignment: Alignment.center,
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: otpController,
                maxLines: 1,
                textAlign: TextAlign.center,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    borderSide:
                        BorderSide(color: Color.fromRGBO(24, 188, 164, 1)),
                  ),
                  hintText: 'Enter OTP',
                  hintStyle: TextStyle(fontSize: 15),
                ),
              ),
              SizedBox(height: MediaQuery.of(context).size.height * 0.01),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  TextButton(
                      style: ButtonStyle(
                          minimumSize: MaterialStateProperty.all<Size>(
                              const Size(110, 20)),
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromRGBO(24, 188, 164, 1))),
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Cancel',
                          style: TextStyle(color: Colors.white, fontSize: 15))),
                  TextButton(
                      style: ButtonStyle(
                          minimumSize: MaterialStateProperty.all<Size>(
                              const Size(110, 20)),
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromRGBO(24, 188, 164, 1))),
                      onPressed: () {
                        Navigator.of(context).pop(otpController.text);
                      },
                      child: const Text('Verify',
                          style: TextStyle(color: Colors.white, fontSize: 15))),
                ],
              )
            ],
          ),
        );
      });
}


  Future<void> _handleEmailLogin() async {
  var url = 'https://webapi.waysdatalabs.com/keacare/api/caregiver/login/otp';
  var body = {'email': _emailIDController.text};
  var headers = {'Content-Type': 'application/json'};

  try {
    var response = await http.post(Uri.parse(url), headers: headers, body: jsonEncode(body));
    var responseBody = jsonDecode(response.body);
    print('Validation response body: ${response.body}');

    if (responseBody.containsKey('otp')) {
      String? userEnteredOTP = await getUserEnteredOTP(context);

      if (userEnteredOTP != null && userEnteredOTP.isNotEmpty) {
        var validateOtpUrl = 'https://webapi.waysdatalabs.com/keacare/api/caregiver/login';
        var otpValidationResponse = await http.post(
          Uri.parse(validateOtpUrl),
          headers: headers,
          body: jsonEncode({'email': _emailIDController.text, 'token': userEnteredOTP}),
        );

        var validationResponseBody = jsonDecode(otpValidationResponse.body);
        print('Validation response body: ${otpValidationResponse.body}');

        User user = User.fromJson(validationResponseBody);
        if (user.success) {
          await storage.write(key: 'jwt_token', value: user.jwtToken);
          await storage.write(key: 'user_email', value: user.email);
          print("Authenticated successfully with JWT via email!");
          print('Server response: ${response.body}');
          print('Email being sent: ${_emailIDController.text}');
          print('User-entered OTP: $userEnteredOTP');


          // Navigate to HomePage after successful authentication
          Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (context) => const MainPage()));

        } else {
          print('Server response: ${response.body}');
        }
      } else {
        print("User did not enter the OTP!");
      }
    } else {
      print("OTP not found in response!");
    }
  } catch (e) {
    print("An error occurred: $e");
    
  }
}


  

@override
  void dispose() {
    _emailIDController.dispose();
    super.dispose();
  }

   @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: const Color.fromRGBO(24, 188, 164, 1),
        centerTitle: true,
        title: const Text('Login'),
        titleTextStyle: const TextStyle(
            color: Colors.white, fontSize: 20, fontWeight: FontWeight.w500)),
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          height: double.infinity,
          child: SingleChildScrollView(
            physics: const BouncingScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: MediaQuery.of(context).size.height * 0.2),
                SvgPicture.asset('assets/undraw_mobile_login_re_9ntv (1).svg',
                    width: 180, height: 180),
                const SizedBox(height: 25),
                SizedBox(
                  width: MediaQuery.of(context).size.width * 0.7,
                  child: TextField(
                    controller: _emailIDController,
                    maxLines: 1,
                    textAlign: TextAlign.center,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                        borderSide:
                            BorderSide(color: Color.fromRGBO(24, 188, 164, 1)),
                      ),
                      hintText: 'Email Id',
                      hintStyle: TextStyle(fontSize: 15),
                    ),
                  ),
                ),
                const SizedBox(height: 15),
                TextButton(
                  style: ButtonStyle(
                      minimumSize: MaterialStateProperty.all<Size>(
                          const Size(150, 40)),
                      backgroundColor: MaterialStateProperty.all<Color>(
                          const Color.fromRGBO(24, 188, 164, 1))),
                  onPressed: () async {
                    if (_emailIDController.text.isEmpty) {
                      ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Center(
                                  child:
                                      Text('Please enter your email address'))));
                    } else {
                      await _handleEmailLogin();  // Moved the logic to _handleEmailLogin
                    }
                  },
                  child: const Text('Send OTP',
                      style: TextStyle(color: Colors.white, fontSize: 18))),
                const SizedBox(height: 15),
                ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                      const Color.fromRGBO(24, 188, 164, 1),
                       // Change to your desired color.
    ),
    minimumSize: MaterialStateProperty.all<Size>(const Size(100, 40)),
  ),
  onPressed: _handleGoogleSignIn,
  child: Row(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      Image.asset('assets/google_logo.png', height: 20.0),
      const SizedBox( width: 6),  // Spacing between the logo and the text.
      const Text("Sign in with Google"),
    ],
  ),
),
              ],
            ),
          ),
        ),
      ),
    );
  }
}