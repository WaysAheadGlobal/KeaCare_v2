import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:flutter/material.dart';
import 'package:keacare/pages/caregiver_card_expand.dart';
import 'package:keacare/pages/retrieve_jobs.dart';
import 'filter_page.dart';
import 'package:http/http.dart' as http;
import 'package:keacare/constants/constant.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'all_jobs_page.dart';

class MainPageHome extends StatefulWidget {
   final Map<String, dynamic>? filters;
  const MainPageHome({Key? key, this.filters}) : super(key: key);

  
  @override
  State<MainPageHome> createState() => _MainPageHomeState();
}

class _MainPageHomeState extends State<MainPageHome> {
  late Future<List<Job>> jobsFuture;
  bool searching = false;
  final TextEditingController _speciality = TextEditingController();
  final TextEditingController _rate = TextEditingController();
  final storage = const FlutterSecureStorage();
  


  

  List<DropdownMenuItem<String>> get dropdownItems {
    List<DropdownMenuItem<String>> menuItems = [
      const DropdownMenuItem(value: "4.5", child: Text("Above 4.5 Ratings")),
      const DropdownMenuItem(value: "4", child: Text("Above 4 Ratings")),
      const DropdownMenuItem(value: "3", child: Text("Above 3 Ratings")),
      const DropdownMenuItem(value: "2", child: Text("Above 2 Ratings")),
    ];
    return menuItems;

  }

  

  @override
void initState() {
  super.initState();
  jobsFuture = fetchJobs();
  jobsFuture = fetchJobs(filters: widget.filters); // If you want to store the future to display the jobs later
   // This will fetch and store the image URL
}

  

  

  Future<Map<String, String>> getHeadersWithToken() async {
  String? token = await storage.read(key: 'jwt_token');
  if (token == null) {
    throw Exception('Token not found');
  }
  Map<String, String> headers = {
    'Content-Type': 'application/json',
    'Authorization': '$token',
  };
  
  // Print the JWT token header
  print('JWT Token Header: ${headers['Authorization']}');
  
  return headers;
}

Future<List<Job>> fetchJobs({Map<String, dynamic>? filters}) async {
  String? email = await storage.read(key: 'user_email');
  if (email == null) {
    throw Exception('Email not found in storage');
  }

  var headers = await getHeadersWithToken();
  var url = 'https://webapi.waysdatalabs.com/keacare/api/caregiver/jobs';
  if (filters != null && filters.isNotEmpty) {
    // Apply filters: Convert filters to query parameters or a JSON body as per your API requirements
    var queryParameters = filters.entries.map((e) => '${e.key}=${Uri.encodeComponent(e.value.toString())}').join('&');
    url += '?email=$email&$queryParameters';
  } else {
    // Show all jobs: Just append the email to the URL
    url += '?email=$email';
  }

  final response = await http.get(Uri.parse(url), headers: headers);

  if (response.statusCode == 200) {
    final List<dynamic> responseData = json.decode(response.body);
    return responseData.map((data) => Job(
              id: data['id'],
              imageUrl: data['imageUrl'],
              additionalService: data['additionalService'],
              age: data['age'],
              availability: data['availability'],
              comfortableWithPets: data['comfortableWithPets'],
              experience: data['experience'],
              hourlyRate: data['hourlyRate'],
              jobDescription: data['jobDescription'],
              language: data['language'],
              location: data['location'],
              rating: data['rating'],
              speciality: data['speciality'],
              time: data['time'],
              status: data['status'],
              createdOn: data['createdOn'],
              modifiedOn: data['modifiedOn'],
              responses: data['responses'],
              fname: data['fname'],
              lname: data['lname']
            )).toList();
  } else {
    throw Exception('Failed to load jobs');
  }
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

  String formatString(String input) {
    final words = input.split('_');
    final formattedWords = words.map((word) {
      return word[0].toUpperCase() + word.substring(1);
    }).toList();
    return formattedWords.join(' ');
  }

  Future<void> _navigateAndDisplayFilters(BuildContext context) async {
  final result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const FilterScreen()),
  );

  if (result != null) {
    // Set state to refresh the jobs list with the new filters
    setState(() {
      jobsFuture = fetchJobs(filters: result as Map<String, dynamic>);
    });
  }
}


  @override
  Widget build(BuildContext context) {
  return Scaffold(
    body: SingleChildScrollView( // Wrap your column with a SingleChildScrollView
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.all(15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children:  [
                  Text(
                    "Welcome!",
                    style: TextStyle(fontSize: 27, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    "Find Jobs Near You!",
                    style: TextStyle(fontSize: 17),
                  ),
                ],
              ),
              Image.asset(
                "assets/About Us Image 2x.png",
                width: MediaQuery.of(context).size.width * 0.17,
                height: MediaQuery.of(context).size.width * 0.17,
              ),
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          TextField(
            controller: _speciality,
            maxLines: 1,
            textAlign: TextAlign.start,
            decoration: const InputDecoration(
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(10)),
                borderSide: BorderSide(color: Color.fromRGBO(108, 99, 255, 1)),
              ),
              hintText: 'Search Services',
              hintStyle: TextStyle(fontSize: 15),
              suffixIcon: Icon(Icons.search),
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          Row(
            children: [
              Container(
                height: MediaQuery.of(context).size.height * 0.07,
                width: MediaQuery.of(context).size.width * 0.45,
                alignment: Alignment.center,
                child:  TextField(
                  controller: _rate,
                  maxLines: 1,
                  textAlign: TextAlign.start,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                      borderSide:
                          BorderSide(color: Color.fromRGBO(108, 99, 255, 1)),
                    ),
                    hintText: 'Price',
                    hintStyle: TextStyle(fontSize: 15),
                    suffixIcon: Icon(Icons.price_change_rounded),
                  ),
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.015,
              ),
              Container(
                alignment: Alignment.center,
                width: MediaQuery.of(context).size.width * 0.45,
                height: MediaQuery.of(context).size.height * 0.07,
                decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey.shade500),
                    borderRadius: BorderRadius.circular(10)),
                child: DropdownButton(
                  underline: const SizedBox(),
                  value: ratingSelectedValue,
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 15),
                  items: dropdownItems,
                  onChanged: (String? newValue) {
                    setState(() {
                      ratingSelectedValue = newValue!;
                    });
                  },
                ),
              )
            ],
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          GestureDetector(
            onTap: () {
              setState(() {
                if(_speciality.text.isEmpty){
                  service = "";
                  searching = false;
                }
                else{
                  searching = true;
                  service = _speciality.text;
                  if(_rate.text.isNotEmpty){
                    rate = int.parse(_rate.text);
                  }
                }
              });
            },
            child: Container(
              height: MediaQuery.of(context).size.height * 0.04,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(width: 2,color: const Color.fromARGB(255, 11, 160, 150))),
              alignment: Alignment.center,
              width: MediaQuery.of(context).size.width,
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.search,
                    color: Colors.black,
                  ),
                  Text(
                    "Search",
                    style: TextStyle(color: Colors.black, fontSize: 15),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          GestureDetector(
  onTap: () => _navigateAndDisplayFilters(context),
        
                      
           
            child: Container(
              height: MediaQuery.of(context).size.height * 0.04,
              decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 11, 160, 150),
                  borderRadius: BorderRadius.circular(10)),
              alignment: Alignment.center,
              width: MediaQuery.of(context).size.width,
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.filter_alt_outlined,
                    color: Colors.white,
                  ),
                  Text(
                    "Apply Filter",
                    style: TextStyle(color: Colors.white, fontSize: 15),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.01,
          ),
          SizedBox(
  height: MediaQuery.of(context).size.height * 0.01,
),
Container(
  height: MediaQuery.of(context).size.height * 0.04, // Match the height of the Apply Filter button
  decoration: BoxDecoration(
    color: const Color.fromARGB(255, 11, 160, 150), // Same teal-like color as Apply Filter button
    borderRadius: BorderRadius.circular(10), // Rounded corners
    border: Border.all(color: const Color.fromARGB(255, 11, 160, 150)), // Same border color
  ),
  width: MediaQuery.of(context).size.width, // Full width of the screen
  child: TextButton(
    onPressed: () async {
      // Your navigation logic or function call
      try {
        List<Job> jobs = await fetchJobs(); // Fetch all jobs
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => AllJobsPage(jobs: jobs),
          ),
        );
      } catch (e) {
        // Handle the error, for example, by showing an alert dialog
        print(e); // For debugging purposes
      }
    },
    child: Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: const [
        SizedBox(width: 8), // Space between icon and text
        Text(
          "Show All Jobs",
          style: TextStyle(
            color: Colors.white, // White text color
            fontSize: 15,
            fontWeight: FontWeight.bold, // Bold text
          ),
        ),
      ],
    ),
  ),
),
SizedBox(
  height: MediaQuery.of(context).size.height * 0.03,
),
 Image.asset(
              'assets/home.png',
              fit: BoxFit.cover,
              width: MediaQuery.of(context).size.width,
              height: MediaQuery.of(context).size.height * 0.3, 
            ),

                                  ],
                                ),
                            
                            ),
    ),
  );
                          
                  }
                }
              