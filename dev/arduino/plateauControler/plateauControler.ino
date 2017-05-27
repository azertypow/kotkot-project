#define SERIAL_BUFFER_SIZE 256
#include <Adafruit_NeoPixel.h>

// players
#define PLAYERSNUMBER 2

// pixels led
#define LEDPIN 8
#define NUMPIXELS 40

// serial connection status
boolean serialConnected = false;
boolean incomingData = false;
boolean allDataReceivedPrevious = false;
boolean processedData = true;

// serial param
#define SERIAL_CHARACTER_INTI "I"
#define SERIAL_CHARACTER_RESET "R"
#define SERIAL_CHARACTER_BREAK "B"
#define SERIAL_CHARACTER_END "E"

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
  // temps de traitement
  //static unsigned long lastRead = 0;
  //unsigned long pause = millis() - lastRead;
  //lastRead = millis();

  //––––– priorité au data potentiellement recu –––––//
  // regarder si toutes les data ont bien été recu dans la boucle précédent et en informer nodejs, SEULEMENT SI LA CONNECTION A ÉTÉ VALIDÉE
  if(allDataReceivedPrevious && serialConnected){
    Serial.println("received"); // All data was received in the previous loop
    allDataReceivedPrevious = false;
  }
  // lire recu par serialport
  if(Serial.available()){
    // signaler la venu de donné en cour
    incomingData = true;

    // signaler que les donné en cour de reception n'ont pas étées traité
    processedData = false;

    // montrer la taille de ce qui est recu, SEULEMENT SI LA CONNECTION A ÉTÉ VALIDÉE
    if(serialConnected){
      Serial.print("Serial.available :");
      Serial.println(Serial.available());
    }
    
    //tant que des données sont en attente
    //if(Serial.available() > 55){
      while (Serial.available()) {
        char c = Serial.read();
        reception += c;
        
        //Serial.println(reception);
        //delay(1);
      }

      // traité ce qui a été recu jusqu'a présent
      parseSerialReceived(reception);
      
      // vidée ce qui a été recu jusqu'a présent
      reception="";

      // signaler le fait que l'arduino a bien recu des données (mais pas forcément complete), SEULEMENT SI LA CONNECTION A ÉTÉ VALIDÉE
      if(serialConnected){
        Serial.println("recu");
        Serial.println("fin boucle");
      }
    //}
  }
  else{
    // signaler qu'ocune données n'a été recu
    incomingData = false;
  }

  //––––– traitement des datas recu et non traitées pour les leds –––––//
  // ne pas traiter si reception de donnée en cour !!! (interference avec les datas recues)
  if(! incomingData && ! processedData ){
    // NeoPixel
    lightUpLeds();
    
    // datas traités
    processedData = true;
    Serial.println("treated");
  }

  //delay(3000);
  
  // temps de traitement
  //Serial.print("pause: ");
  //Serial.println(pause);
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
