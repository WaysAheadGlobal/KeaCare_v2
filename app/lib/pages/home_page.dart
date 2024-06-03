import 'package:flutter/material.dart';
import 'package:keacare/pages/login_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox(
          width: double.infinity,
          height: double.infinity,
          child: Stack(
              alignment: Alignment.center,
              clipBehavior: Clip.antiAlias,
              fit: StackFit.expand,
              children: [
                Image.asset('assets/Corner shapes 4x.png',
                    width: double.infinity,
                    height: double.infinity,
                    fit: BoxFit.cover),
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/Logo 2x .png',
                      width: 250,
                      height: 250,
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    TextButton(
                        style: ButtonStyle(
                            minimumSize: MaterialStateProperty.all<Size>(
                                const Size(150, 40)),
                            backgroundColor: MaterialStateProperty.all<Color>(
                                const Color.fromRGBO(24, 188, 164, 1))),
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const LoginPage()));
                        },
                        child: const Text('Login',
                            style:
                                TextStyle(color: Colors.white, fontSize: 18))),
                    // TextButton(
                    //     style: ButtonStyle(
                    //         minimumSize: MaterialStateProperty.all<Size>(
                    //             const Size(150, 40)),
                    //         backgroundColor: MaterialStateProperty.all<Color>(
                    //             const Color.fromRGBO(0, 182, 169, 1))),
                    //     onPressed: () {
                    //     },
                    //     child: const Text('Register',
                    //         style:
                    //             TextStyle(color: Colors.white, fontSize: 18))),
                  ],
                ),
              ]),
        ),
    );
  }
}
