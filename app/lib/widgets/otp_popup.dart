import 'package:flutter/material.dart';
import 'package:keacare/constants/constant.dart';

Future<dynamic> otpPopup(BuildContext context, String email) {
  TextEditingController otpController = TextEditingController();
  return showDialog(
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
                          if(OTP == otpController.text){
                            Navigator.of(context).pop(otpController.text);
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Center(child: Text('Invalid OTP'))));
    }
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
