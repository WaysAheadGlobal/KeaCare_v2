class User {
  final bool success;
  final String email;
  final String jwtToken;

  User({
    required this.success,
    required this.email,
    required this.jwtToken,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      success: json['success'] ?? false,
      email: json['email'] ?? '',
      jwtToken: json['jwtToken'] ?? '',
    );
  }
}
