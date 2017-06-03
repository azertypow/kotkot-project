#define SERIAL_BUFFER_SIZE 256
#include <Adafruit_NeoPixel.h>

// players
#define PLAYERSNUMBER 8       // nombre de joueurs
#define STRIPLEDSNUMBER 10     // nombre de leds par bandes devant les joueurs
#define LAWNUMBER 10          // nombre de leds pour les lois de chaques parties
#define COEFFICIENTSLEDNUMNER 5  // nombre de led pour les cohéficient de vote de qhasue jouers

// pixels led
#define LEDPIN 8
#define NUMPIXELS 149
#define MAXLEDINTENSITY 50

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
String directive = "";

// setup the NeoPixel library
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, LEDPIN, NEO_GRB + NEO_KHZ800);

// directive sur les leds
boolean run_Intro = false;
boolean run_RandomPlacement = false;

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
    
    // traiter la directive correspondant à la data envoyé
    dataToInstructions();
    
    // datas traités
    processedData = true;
    Serial.println("treated");
  }

  //––––– annimation des led ––––––––––//
  if(run_Intro == true){
    play_Intro();
  }
  else if (run_RandomPlacement){
    play_random_placement();
  }

  //delay(3000);
  
  // temps de traitement
  //Serial.print("pause: ");
  //Serial.println(pause);
}
