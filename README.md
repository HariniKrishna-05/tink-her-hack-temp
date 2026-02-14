<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# Safario 🎯

## Basic Details

### Team Name: Double Trouble

### Team Members
- Member 1: Nivya Sudeesh - LBS Institute of Technology for Women
- Member 2: Harini M - LBS Institute of Technology for Women

### Hosted Project Link
https://harinikrishna-05.github.io/tink-her-hack-temp/

### Project Description
Safario is a travel companion app designed for solo travelers. It matches users with compatible travel buddies, suggests safe routes, and provides real-time safety scores for destinations.

### The Problem statement
Solo travelers often face safety concerns, lack of company, and difficulty in planning their trips efficiently. There is no platform that combines buddy matching, safe route suggestions, and destination safety insights in one place.

### The Solution

1.Suggesting potential travel buddies with overlapping destinations and dates.

2.Providing safety scores for destinations and routes.

3.Allowing users to send travel requests and coordinate plans securely.


## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: JavaScript (Frontend & Backend), HTML, CSS
- Frameworks used: Node.js, Express, Bootstrap
- Libraries used: Axios, bcrypt.js, MySQL2, EJS (for templating)
- Tools used: VS Code, Git, Postman

**For Hardware:**
  Not applicable (Software-only project)

---

## Features

List the key features of your project:

Matching: Suggest travel companions based on location and travel dates.
Safety Score: Rate destinations and routes based on crime data and user reviews.
Travel Requests: Send and accept requests to coordinate travel plans.
User Dashboard: Personalized panel showing matches, routes, and safety insights.[Description]

---

## Implementation

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```

## Project Documentation

### For Software:

#### Screenshots (Add at least 3)

<img width="1902" height="907" alt="welcome" src="https://github.com/user-attachments/assets/2a556cc7-8a0c-4762-98f6-c46cdf4dc239" />
It serves as the landing/welcome page that introduces Safario, shows its purpose of safe solo travel, highlights key benefits, and guides users to sign in or create an account to start using the platform.



<img width="1908" height="911" alt="sign in" src="https://github.com/user-attachments/assets/4b909ba6-786d-465f-93ad-1b8cd73ef475" />


<img width="1906" height="910" alt="create account" src="https://github.com/user-attachments/assets/1672dde8-a95c-4cdc-aa38-30b0da5ee6cf" />

<img width="1911" height="903" alt="dashboard" src="https://github.com/user-attachments/assets/4b11b945-88b4-450e-a938-c20b9198314f" />

<img width="1912" height="914" alt="profile" src="https://github.com/user-attachments/assets/af6b2d0b-1474-476c-afae-6c71b3ff7353" />

<img width="1905" height="909" alt="safe routes" src="https://github.com/user-attachments/assets/130f5123-4a57-4f16-a375-329c40388f3e" />

<img width="1881" height="898" alt="budies" src="https://github.com/user-attachments/assets/ee67857a-4720-4b8f-867f-fb6b4eb70c98" />

#### Diagrams

**System Architecture:**

Frontend: HTML, CSS, JavaScript

Backend: Node.js + Express

Database: MySQL (storing users, destinations, routes, buddy matches)

Workflow: User interacts → server queries database → displays matches/routes → updates safety scores

**Application Workflow:**

User logs in or registers.

User inputs travel details (destination & dates).

System calculates matches and safety scores.

User can send travel requests and view matched profiles.


## Additional Documentation

### For Web Projects with Backend:

#### API Documentation

**Base URL:** `https://api.yourproject.com`

##### Endpoints

**GET /api/endpoint**
- **Description:** [What it does]
- **Parameters:**
  - `param1` (string): [Description]
  - `param2` (integer): [Description]
- **Response:**
```json
{
  "status": "success",
  "data": {}
}
```

**POST /api/endpoint**
- **Description:** [What it does]
- **Request Body:**
```json
{
  "field1": "value1",
  "field2": "value2"
}
```
- **Response:**
```json
{
  "status": "success",
  "message": "Operation completed"
}
```

[Add more endpoints as needed...]

---

### For Mobile Apps:

#### App Flow Diagram

![App Flow](docs/app-flow.png)
*Explain the user flow through your application*

#### Installation Guide

**For Android (APK):**
1. Download the APK from [Release Link]
2. Enable "Install from Unknown Sources" in your device settings:
   - Go to Settings > Security
   - Enable "Unknown Sources"
3. Open the downloaded APK file
4. Follow the installation prompts
5. Open the app and enjoy!

**For iOS (IPA) - TestFlight:**
1. Download TestFlight from the App Store
2. Open this TestFlight link: [Your TestFlight Link]
3. Click "Install" or "Accept"
4. Wait for the app to install
5. Open the app from your home screen

**Building from Source:**
```bash
# For Android
flutter build apk
# or
./gradlew assembleDebug

# For iOS
flutter build ios
# or
xcodebuild -workspace App.xcworkspace -scheme App -configuration Debug
```

---

### For Hardware Projects:

#### Bill of Materials (BOM)

| Component | Quantity | Specifications | Price | Link/Source |
|-----------|----------|----------------|-------|-------------|
| Arduino Uno | 1 | ATmega328P, 16MHz | ₹450 | [Link] |
| LED | 5 | Red, 5mm, 20mA | ₹5 each | [Link] |
| Resistor | 5 | 220Ω, 1/4W | ₹1 each | [Link] |
| Breadboard | 1 | 830 points | ₹100 | [Link] |
| Jumper Wires | 20 | Male-to-Male | ₹50 | [Link] |
| [Add more...] | | | | |

**Total Estimated Cost:** ₹[Amount]

#### Assembly Instructions

**Step 1: Prepare Components**
1. Gather all components listed in the BOM
2. Check component specifications
3. Prepare your workspace
![Step 1](images/assembly-step1.jpg)
*Caption: All components laid out*

**Step 2: Build the Power Supply**
1. Connect the power rails on the breadboard
2. Connect Arduino 5V to breadboard positive rail
3. Connect Arduino GND to breadboard negative rail
![Step 2](images/assembly-step2.jpg)
*Caption: Power connections completed*

**Step 3: Add Components**
1. Place LEDs on breadboard
2. Connect resistors in series with LEDs
3. Connect LED cathodes to GND
4. Connect LED anodes to Arduino digital pins (2-6)
![Step 3](images/assembly-step3.jpg)
*Caption: LED circuit assembled*

**Step 4: [Continue for all steps...]**

**Final Assembly:**
![Final Build](images/final-build.jpg)
*Caption: Completed project ready for testing*

---

### For Scripts/CLI Tools:

#### Command Reference

**Basic Usage:**
```bash
python script.py [options] [arguments]
```

**Available Commands:**
- `command1 [args]` - Description of what command1 does
- `command2 [args]` - Description of what command2 does
- `command3 [args]` - Description of what command3 does

**Options:**
- `-h, --help` - Show help message and exit
- `-v, --verbose` - Enable verbose output
- `-o, --output FILE` - Specify output file path
- `-c, --config FILE` - Specify configuration file
- `--version` - Show version information

**Examples:**

```bash
# Example 1: Basic usage
python script.py input.txt

# Example 2: With verbose output
python script.py -v input.txt

# Example 3: Specify output file
python script.py -o output.txt input.txt

# Example 4: Using configuration
python script.py -c config.json --verbose input.txt
```

#### Demo Output

**Example 1: Basic Processing**

**Input:**
```
This is a sample input file
with multiple lines of text
for demonstration purposes
```

**Command:**
```bash
python script.py sample.txt
```

**Output:**
```
Processing: sample.txt
Lines processed: 3
Characters counted: 86
Status: Success
Output saved to: output.txt
```

**Example 2: Advanced Usage**

**Input:**
```json
{
  "name": "test",
  "value": 123
}
```

**Command:**
```bash
python script.py -v --format json data.json
```

**Output:**
```
[VERBOSE] Loading configuration...
[VERBOSE] Parsing JSON input...
[VERBOSE] Processing data...
{
  "status": "success",
  "processed": true,
  "result": {
    "name": "test",
    "value": 123,
    "timestamp": "2024-02-07T10:30:00"
  }
}
[VERBOSE] Operation completed in 0.23s
```

---

## Project Demo

### Video
[Add your demo video link here - YouTube, Google Drive, etc.]

*Explain what the video demonstrates - key features, user flow, technical highlights*

### Additional Demos
[Add any extra demo materials/links - Live site, APK download, online demo, etc.]

---

## AI Tools Used 

**Tool Used:** ChatGPT

**Purpose:** [What you used it for]
- Assisted in code structuring, frontend design suggestions, and debugging Node.js APIs.
- Generated boilerplate code snippets for backend and routing.


**Human Contributions:**
- Custom frontend design and CSS styling
- Node.js backend and MySQL integration
- UI/UX planning, database schema design, and testing

*Note: Proper documentation of AI usage demonstrates transparency and earns bonus points in evaluation!*

---

## Team Contributions

- Nivya Sudeesh: Frontend development, UI/UX design, destination and buddy panels.
- Harini M: Backend development, Node.js API, MySQL database integration, safety score logic.


## License

This project is licensed under the [LICENSE_NAME] License - see the [LICENSE](LICENSE) file for details.

**Common License Options:**
- MIT License (Permissive, widely used)
- Apache 2.0 (Permissive with patent grant)
- GPL v3 (Copyleft, requires derivative works to be open source)

---

Made with ❤️ at TinkerHub
