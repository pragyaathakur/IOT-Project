
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h> // Include ArduinoJson library

// Replace with your network credentials
const char* ssid = "Einstein's Lap";      // Your WiFi SSID
const char* password = "Ash11119"; // Your WiFi password

// Replace with your API URL
const char* apiUrl = "https://get-your-book.vercel.app/books"; // The API link you want to fetch data from

// Define LED pins
const int ledPins[6] = {D1, D2, D3, D4, D5, D6}; // Change these pin numbers as needed

int shelfNumber = -1; // Global variable for shelf number
int lastShelfNumber = -1; // Store last shelf number to compare

void setup() {
  Serial.begin(115200); // Initialize serial communication
  connectToWiFi();      // Connect to Wi-Fi
  
  // Initialize LED pins as outputs
  for (int i = 0; i < 6; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW); // Turn off all LEDs initially
  }
}

void loop() {
  fetchData();          // Fetch data from the API
  delay(5000);          // Wait for 5 seconds before fetching again
}

void connectToWiFi() {
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password); // Connect to Wi-Fi
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP()); // Print the local IP address
}

void fetchData() {
  WiFiClientSecure client; // Use WiFiClientSecure for HTTPS connections
  client.setInsecure();    // Disable SSL certificate verification (use with caution)

  Serial.print("Connecting to ");
  Serial.println(apiUrl);
  
  // Attempt to connect to the API URL
  if (!client.connect("get-your-book.vercel.app", 443)) {
    Serial.println("Connection failed!");
    return;
  }

  // Send HTTP GET request
  client.print(String("GET ") + "/books" +
               " HTTP/1.1\r\n" +
               "Host: get-your-book.vercel.app\r\n" +
               "Connection: close\r\n\r\n");

  // Wait for the response
  while (!client.available()) {
    delay(100);
  }

  // Read the response
  String response = client.readString();

  // Separate headers and body
  int bodyStart = response.indexOf("\r\n\r\n");
  if (bodyStart == -1) {
    Serial.println("No valid response body found.");
    return;
  }
  
  // Extract body
  String body = response.substring(bodyStart + 4);
  
  // Parse the JSON response
  DynamicJsonDocument doc(1024); // Create a dynamic JSON document
  DeserializationError error = deserializeJson(doc, body); // Deserialize the JSON
  
  // Check for errors
  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.f_str());
    return;
  }

  // Extract shelfNumber
  JsonArray array = doc.as<JsonArray>(); // Convert document to JSON array
  if (array.size() > 0) {
    int newShelfNumber = array[0]["shelfNumber"]; // Access shelfNumber from the first element
    
    // Check if the fetched shelfNumber is different from the last one
    if (newShelfNumber != lastShelfNumber) {
      shelfNumber = newShelfNumber; // Update shelfNumber
      lastShelfNumber = newShelfNumber; // Update lastShelfNumber
    } else {
      // If the same value is received twice, reset shelfNumber
      shelfNumber = -1;
      // lastShelfNumber = -1; // Reset lastShelfNumber as well
    }
    
    Serial.print("Shelf Number: ");
    Serial.println(shelfNumber); // Print the shelf number

    // Update LEDs based on the shelfNumber
    updateLEDs(shelfNumber);
  } else {
    Serial.println("No books found in the response.");
  }
}

void updateLEDs(int shelfNumber) {
  // Turn off all LEDs
  for (int i = 0; i < 6; i++) {
    digitalWrite(ledPins[i], LOW);
  }

  // Check if shelfNumber is valid and within range
  if (shelfNumber >= 0 && shelfNumber < 6) {
    // Turn on the LED corresponding to the shelfNumber
    digitalWrite(ledPins[shelfNumber], HIGH);
    Serial.print("Shelf Number : ");
    Serial.print(shelfNumber);
    Serial.println("'s Led is ON");
  }
}






