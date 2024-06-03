import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

// Contact Model
class Contact {
  final int id;
  final String firstName;
  final String lastName;
  final String imageUrl;
  final int careseekerId;

  Contact({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.imageUrl,
    required this.careseekerId,
  });

  factory Contact.fromJson(Map<String, dynamic> json) {
    return Contact(
      id: json['id'],
      firstName: json['fname'],
      lastName: json['lname'],
      imageUrl: json['imageUrl'] ?? '',
      careseekerId: json['careseekerId'],
    );
  }
}


class MessagingApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
    );
  }
}

class ContactsPage extends StatefulWidget {
  @override
  _ContactsPageState createState() => _ContactsPageState();
}

class _ContactsPageState extends State<ContactsPage> {
  final storage = const FlutterSecureStorage(); // Replace with your token
  List<Contact> contacts = [];

  @override
  void initState() {
    super.initState();
    fetchContacts();
  }

  Future<Map<String, String>> getHeadersWithToken() async {
    String? token = await storage.read(key: 'jwt_token');
    if (token == null) {
      throw Exception('Token not found');
    }
    return {
      'Authorization': '$token',
    };
  }

  Future<void> fetchContacts() async {
    final headers = await getHeadersWithToken();
    final response = await http.get(
      Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/contacts'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      final List<dynamic> contactList = json.decode(response.body);
      setState(() {
        contacts = contactList.map((json) => Contact.fromJson(json)).toList();
      });
    } else {
      // Handle errors
      print('Failed to load contacts');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: contacts.length,
        itemBuilder: (context, index) {
          final contact = contacts[index];
          return ListTile(
            leading: CircleAvatar(
              backgroundImage: NetworkImage(contact.imageUrl),
            ),
            title: Text('${contact.firstName} ${contact.lastName}'),
            onTap: () {
              // Navigate to Chat UI
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ChatPage(contact: contact),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class ChatMessage {
  final senderId;
  final receiverId;
  final String message;
  

  ChatMessage({
    required this.senderId,
    required this.receiverId,
    required this.message,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> json) {
    return ChatMessage(
      senderId: json['senderId'],
      receiverId: json['receiverId'],
      message: json['message'],
    );
  }
}


class ChatPage extends StatefulWidget {
  final Contact contact;

  ChatPage({required this.contact});

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _messageController = TextEditingController();
  List<ChatMessage> messages = [];
  
  late final int careseekerId; 
  final storage = const FlutterSecureStorage();// Assume this is set correctly

  @override
  void initState() {
    super.initState();
    fetchChatMessages();
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

  Future<void> fetchChatMessages() async {
    final headers = await getHeadersWithToken();
    final response = await http.get(
      Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/chats/all/${widget.contact.careseekerId}'),
      headers: headers,
    );

    if (response.statusCode == 200) {
      final List<dynamic> messagesList = json.decode(response.body);
      setState(() {
        messages = messagesList.map((json) => ChatMessage.fromJson(json)).toList();
      });
    } else {
      // Handle errors
      print('Failed to load messages');
    }
  }

  Future<void> sendMessage() async {
    final headers = await getHeadersWithToken();
    
    final response = await http.post(
      Uri.parse('https://webapi.waysdatalabs.com/keacare/api/caregiver/chats'),
      headers: headers,
      body: json.encode({
        'message': _messageController.text,
        'receiverId': widget.contact.careseekerId,
      }),
    );

    if (response.statusCode == 200) {
      // Handle successful message send, like clearing the input field
      _messageController.clear();
      fetchChatMessages(); // Optionally re-fetch messages to show the new one
    } else {
      // Handle errors
      print('Failed to send message');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat with ${widget.contact.firstName}'),
        backgroundColor: const Color.fromRGBO(0, 181, 168, 1),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                final isSentByMe = message.senderId == message.senderId;

                return Align(
                  alignment: isSentByMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    margin: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: isSentByMe ? Color.fromRGBO(0, 181, 168, 1) : Colors.grey[300],
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      message.message,
                      style: TextStyle(color: isSentByMe ? Colors.white : Colors.black),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: EdgeInsets.all(8.0),
            child: TextField(
              controller: _messageController,
              decoration: InputDecoration(
                hintText: 'Type a message...',
                suffixIcon: IconButton(
                  icon: Icon(Icons.send),
                  onPressed: sendMessage,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}