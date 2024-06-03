import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:keacare/pages/retrieve_jobs.dart';

class CaregiverCardExpandPage extends StatefulWidget {
  final Job job;

  const CaregiverCardExpandPage({super.key, required this.job});

  @override
  State<CaregiverCardExpandPage> createState() =>
      _CaregiverCardExpandPageState();
}

class _CaregiverCardExpandPageState extends State<CaregiverCardExpandPage> {

  String formatString(String input) {
    final words = input.split('_');
    final formattedWords = words.map((word) {
      return word[0].toUpperCase() + word.substring(1);
    }).toList();
    return formattedWords.join(' ');
  }

  String formatDateTime(String dateTimeString) {
    final dateTime = DateTime.parse(dateTimeString);
    final formatter = DateFormat('dd/MM/yyyy'); // Format to day/month/year
    return formatter.format(dateTime.toLocal()); // Convert to local time before formatting
  }

  String convertTime(String timeString) {
    final parts = timeString.split('_');
    int hours = int.parse(parts[1]);
    final isAM = parts[0] == 'AM';

    // Convert hours based on AM or PM
    if (!isAM && hours != 12) {
      hours += 12;
    } else if (isAM && hours == 12) {
      hours = 0;
    }

    final amOrPm = isAM ? 'AM' : 'PM';
    final formattedTime = '${hours.toString().padLeft(2, '0')}:00 $amOrPm';
    return formattedTime;
  }

  int daysBetweenDates(String startDate, String endDate) {
    List<int> startParts = startDate.split('/').map(int.parse).toList();
    List<int> endParts = endDate.split('/').map(int.parse).toList();

    DateTime start = DateTime(startParts[2], startParts[1], startParts[0]);
    DateTime end = DateTime(endParts[2], endParts[1], endParts[0]);

    Duration difference = end.difference(start);

    return difference.inDays;
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: const Color.fromRGBO(24, 188, 164, 1),
      ),
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(30),
          width: double.infinity,
          height: double.infinity,
          alignment: Alignment.center,
          decoration: const BoxDecoration(
            color: Colors.white,
          ),
          child: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Colors.green.shade100,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: EdgeInsets.only(
                      left: MediaQuery.of(context).size.width * 0.07),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: MediaQuery.of(context).size.width * 0.11,
                        backgroundImage:
                            NetworkImage(widget.job.imageUrl.toString()),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.07,
                      ),
                      Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "${widget.job.fname} ${widget.job.lname}",
                            style: const TextStyle(
                                fontSize: 24, fontWeight: FontWeight.bold),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                "\$${widget.job.hourlyRate}",
                                style: const TextStyle(
                                    fontSize: 30, fontWeight: FontWeight.bold),
                              ),
                              Padding(
                                padding: EdgeInsets.only(
                                    bottom: MediaQuery.of(context).size.height *
                                        0.005),
                                child: const Text(
                                  "/Hourly",
                                  style: TextStyle(fontSize: 14),
                                ),
                              ),
                            ],
                          ),
                        ],
                      )
                    ],
                  ),
                ),
                const Divider(),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              "assets/Speciality Icon 2x.png",
                              width: 20,
                              height: 20,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                            Text(
                              formatString(widget.job.speciality),
                              style: const TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.006,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              "assets/Experience Icon 2x.png",
                              width: 20,
                              height: 20,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                            Text(
                              "${widget.job.experience} years",
                              style: const TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.006,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              "assets/Rating Icon 2x.png",
                              width: 20,
                              height: 20,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                            Text(
                              "${widget.job.rating}",
                              style: const TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              "assets/Pets Icon 2x.png",
                              width: 20,
                              height: 20,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                             Text(
                              widget.job.comfortableWithPets == 1 || widget.job.comfortableWithPets==true? "Have Pets" : "No Pets",
                              style: const TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.006,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Image.asset(
                              "assets/Multitask Icon 2x.png",
                              width: 20,
                              height: 20,
                            ),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                            const Text(
                              "Can Multitask",
                              style: TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: MediaQuery.of(context).size.height * 0.006,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            const Icon(Icons.location_on),
                            SizedBox(
                              width: MediaQuery.of(context).size.width * 0.009,
                            ),
                            const Text(
                              "2.5 km",
                              style: TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
                const Divider(),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    const Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                      
                        
                        
                      ],
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Text(
                              "Frequency - ",
                              style: TextStyle(
                                  fontSize: 15, fontWeight: FontWeight.bold),
                            ),
                            Text(
                              "One Time",
                              style: TextStyle(fontSize: 15),
                            ),
                          ],
                        ),
                        Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            const Text("Experience - ",
                                style: TextStyle(
                                    fontSize: 15, fontWeight: FontWeight.bold)),
                            Text(widget.job.experience>3?"Professional":"Fresher", style: const TextStyle(fontSize: 15)),
                          ],
                        ),
                      ],
                    )
                  ],
                ),
                const Divider(),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Container(
                        width: MediaQuery.of(context).size.width * 0.37,
                        decoration: BoxDecoration(
                            border: Border.all(color: Colors.black),
                            borderRadius: BorderRadius.circular(10),
                            color: Colors.white),
                        child: TextButton(
                            clipBehavior: Clip.antiAlias,
                            style: ButtonStyle(
                                textStyle: MaterialStateProperty.all(
                                    const TextStyle(fontSize: 17)),
                                shape: MaterialStateProperty.all(
                                    const RoundedRectangleBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(10))))),
                            onPressed: () {},
                            child: const Text("Message",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Colors.black)))),
                    Container(
                        width: MediaQuery.of(context).size.width * 0.37,
                        decoration: BoxDecoration(
                            color: const Color.fromARGB(255, 11, 160, 150),
                            border: Border.all(
                                color: const Color.fromARGB(255, 11, 160, 150)),
                            borderRadius: BorderRadius.circular(10)),
                        child: TextButton(
                            style: ButtonStyle(
                                textStyle: MaterialStateProperty.all(
                                    const TextStyle(fontSize: 17))),
                            onPressed: () {},
                            child: const Text(
                              "Apply",
                              style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white),
                            )))
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
