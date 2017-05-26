#define SERIAL_BUFFER_SIZE 256
#include <Adafruit_NeoPixel.h>

// players
#define PLAYERSNUMBER 2

// pixels led
#define LEDPIN 8
#define NUMPIXELS 20

// serial param
#define SERIAL_CHARACTER_INTI "I"
#define SERIAL_CHARACTER_RESET "R"
#define SERIAL_CHARACTER_BREAK "B"
#define SERIAL_CHARACTER_END "E"
boolean incomingData = false;
boolean allDataReceivedPrevious = false;
boolean processedData = true;

// setup the NeoPixel library
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, LEDPIN, NEO_GRB + NEO_KHZ800);

// init string for serialPort
String reception = "";

void setup() {
  Serial.begin(115200); // 9600, 19200, 115200
  while (!Serial) {
    ; // attente de connetcion
  }

  // initializes NeoPixel library
  pixels.begin();
}

void loop() {
  static unsigned long lastRead = 0;

  unsigned long pause = millis() - lastRead;
  lastRead = millis();

  // send potentiometre value for all players
  sendPententiometreUsersValue();
  ///  fin info
  Serial.print("\r\n");

  //––––– debut -> priorité au data potentiellement recu –––––//
  // regarder si toutes les data ont bien été recu dans la boucle précédent
  if(allDataReceivedPrevious){
    Serial.println("received"); // All data was received in the previous loop
  }
  // lire recu par serialport
  if(Serial.available()){
    incomingData = true;
    processedData = false;
    Serial.print("Serial.available :");
    Serial.println(Serial.available());
    
    //tant que des données sont en attente
    if(Serial.available() > 55){
      while (Serial.available()) {
        char c = Serial.read();
        reception += c;
        
        //Serial.println(reception);
        //delay(1);
      }
      
      parseSerialReceived(reception);
      //Serial.println("recu");
      Serial.println("fin boucle");
      reception="";
    }
  }
  else{
    incomingData = false;
  }
  
  Serial.print("pause: ");
  Serial.println(pause);

  // ne pas traiter si reception de donnée en cour
  if(! incomingData && ! processedData ){
    // NeoPixel
    lightUpLeds();
    // datas traités
    processedData = true;
    Serial.println("treated");
  }

  //delay(3000);
}


int count = 0;
void lightUpLeds(){
  for(int i = 0; i < NUMPIXELS; i++){
    if((count + i) % 3 == 0){
      pixels.setPixelColor(i, pixels.Color(150,0,150));
    }
    else if((count + i) % 2 == 0){
      pixels.setPixelColor(i, pixels.Color(150,150,0));
    }
    else{
      pixels.setPixelColor(i, pixels.Color(0,150,150));
    }
  }
  pixels.show();
  //delay(125);
  count ++;
}
