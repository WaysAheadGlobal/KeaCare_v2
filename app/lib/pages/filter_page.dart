import 'package:flutter/material.dart';
import 'main_page_home.dart';



class FilterScreen extends StatefulWidget {
  const FilterScreen({Key? key}) : super(key: key);
  
  @override
  State<FilterScreen> createState() => _FilterScreenState();
}

class _FilterScreenState extends State<FilterScreen> {
  String experienceValue = "1";
  String languageValue = 'English';
  bool comfortablewithpets = false;
  String typeSearch = "child_care";
  bool childValue = true;
  bool seniorValue = false;
  bool petYes = true;
  bool petNo = false;

  List<DropdownMenuItem<String>> get dropdownExperienceItems {
    List<DropdownMenuItem<String>> menuItems = [
      const DropdownMenuItem(value: "1", child: Text("1+ years")),
      const DropdownMenuItem(value: "3", child: Text("3+ years")),
      const DropdownMenuItem(value: "5", child: Text("5+ years")),
      const DropdownMenuItem(value: "10", child: Text("10+ years")),
    ];
    return menuItems;
  }

  List<DropdownMenuItem<String>> get dropdownLanguageItems {
    List<DropdownMenuItem<String>> menuItems = [
      const DropdownMenuItem(value: "English", child: Text("English")),
      const DropdownMenuItem(value: "Spanish", child: Text("Spanish")),
    ];
    return menuItems;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: const Color.fromRGBO(24, 188, 164, 1),
          elevation: 0.0,
        ),
        body: Container(
          width: double.infinity,
          height: double.infinity,
          padding: const EdgeInsets.all(20.0),
          child: Column(
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Type", style: TextStyle(fontSize: 17)),
                  Padding(
                    padding: EdgeInsets.only(
                        right: MediaQuery.of(context).size.width * 0.1),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Checkbox(value: childValue, onChanged: (value) {
                              setState(() {
                                typeSearch = "child_care";
                                childValue = value!;
                                seniorValue = !value;
                              });
                            }),
                            const Text("Child care")
                          ],
                        ),
                        Row(
                          children: [
                            Checkbox(value: seniorValue,onChanged: (value) {
                              setState(() {
                                typeSearch = "senior_care";
                                seniorValue = value!;
                                childValue = !value;
                              });
                            }),
                            const Text("Senior care")
                          ],
                        ),
                      ],
                    ),
                  )
                ],
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Comfortable with pets", style: TextStyle(fontSize: 17)),
                  //Create a list of checkboxes
                  Padding(
                    padding: EdgeInsets.only(
                        right: MediaQuery.of(context).size.width * 0.22),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Checkbox(value: petYes, onChanged: (value) {
                              setState(() {
                                comfortablewithpets = value!;
                                petYes = value;
                                petNo = !value;
                              });
                            }),
                            const Text("Yes")
                          ],
                        ),
                        Row(
                          children: [
                            Checkbox(value: petNo, onChanged: (value) {
                              setState(() {
                                comfortablewithpets = !value!;
                                petYes = !value;
                                petNo = value;
                              });
                            }),
                            const Text("No")
                          ],
                        ),
                      ],
                    ),
                  )
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Experience", style: TextStyle(fontSize: 17)),
                  Padding(
                    padding: EdgeInsets.only(
                        right: MediaQuery.of(context).size.width * 0.13),
                    child: DropdownButton(
                      underline: const SizedBox(),
                      value: experienceValue,
                      style:
                          TextStyle(color: Colors.grey.shade600, fontSize: 15),
                      items: dropdownExperienceItems,
                      onChanged: (String? newValue) {
                        setState(() {
                          experienceValue = newValue!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text("Language", style: TextStyle(fontSize: 17)),
                  Padding(
                    padding: EdgeInsets.only(
                        right: MediaQuery.of(context).size.width * 0.16),
                    child: DropdownButton(
                      underline: const SizedBox(),
                      value: languageValue,
                      style:
                          TextStyle(color: Colors.grey.shade600, fontSize: 15),
                      items: dropdownLanguageItems,
                      onChanged: (String? newValue) {
                        setState(() {
                          languageValue = newValue!;
                        });
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 40,
              ),
              GestureDetector(
                onTap: () {
  final Map<String, dynamic> filterCriteria = {
    'experience': experienceValue,
    'language': languageValue,
    'comfortableWithPets': comfortablewithpets,
    'typeSearch': typeSearch,
  };

  Navigator.pop(context, filterCriteria);
  
},
                

                child: Container(
                  alignment: Alignment.center,
                  width: MediaQuery.of(context).size.width*0.3,
                  height: MediaQuery.of(context).size.height*0.05,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                    color: const Color.fromRGBO(24, 188, 164, 1,)
                  ),
                  child: const Text("Submit",style: TextStyle(color: Colors.white,fontSize: 20),
                  
                  ),
                  
                  
                ),
              )
            ],
          ),
        ));
  }
}
