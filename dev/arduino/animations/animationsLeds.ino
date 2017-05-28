#include <Adafruit_NeoPixel.h>
#define PINNeoPixel 8
// How many NeoPixels are attached to the Arduino?
#define NUMPIXELS 150
#define BRIGHTNESS 40
#define LEDPARBANDE 10
#define NUMBANDES 8

// COLORS
int colors [8] [3] = {
  //as many vals as dim1
  {BRIGHTNESS, 0, 0}, //R
  {0, BRIGHTNESS, 0}, //G
  {0, 0, BRIGHTNESS}, //B
  {0, BRIGHTNESS, BRIGHTNESS}, //C
  {BRIGHTNESS, 0, BRIGHTNESS}, //M
  {BRIGHTNESS, BRIGHTNESS, 0}, //J
  {BRIGHTNESS, BRIGHTNESS, BRIGHTNESS} // White
};

int counter;


Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PINNeoPixel, NEO_GRB + NEO_KHZ800);

int bande;
int color;
int centerToBorderCounter = 0;

void setup() {
  pixels.begin(); // This initializes the NeoPixel library.
  Serial.begin(9600);
}

void effaceTout() {
  for (int i = 0; i < NUMPIXELS ; i++) {
    pixels.setPixelColor(i, pixels.Color(0, 0, 0));
  }
}

void loop() {

  counter++;

//  if(){
//    //hasard(); // à lancer avant de choisir deux joueurs
//  }
//
//  if () {
//    //bande = transcriptionBande('j');
//    //color = transcriptionColor('a');
//    //allumeBande();
//  }
//
//  if () {
//    //timerElimination(centerToBorderCounter);
//  }
//
//  if() {
//    //effaceTout();
//  }

  //timerElimination(centerToBorderCounter);
  effaceTout();
  
  pixels.show(); // This sends the updated pixel color to the hardware.

}


void allumeBande() {

  for (int i = 0; i < LEDPARBANDE; i++) {
    int ledId = i + bande * LEDPARBANDE;
    pixels.setPixelColor(ledId, pixels.Color(colors[color][0], colors[color][1], colors[color][2]));
  }

}

int chooseRandomColor() {

  int dice = int(random(10));
  if (dice == 0) {
    return 0;
  } else if (dice == 1) {
    return 1;
  } else if (dice == 2) {
    return 3;
  } else if (dice == 3) {
    return 4;
  } else {
    return 2;
  }

}

void hasard() {
  for (int i = 0; i < NUMPIXELS; i++) {
    int ledId = i;
    color = chooseRandomColor();
    pixels.setPixelColor(ledId, pixels.Color(colors[color][0], colors[color][1], colors[color][2]));
  }
}


void timerElimination(int _centerToBorderCounter) {
  for (int i = 0; i < NUMBANDES; i++) {
    int ledId = centerToBorderCounter + i * LEDPARBANDE;
    color = 0;
    pixels.setPixelColor(ledId, pixels.Color(colors[color][0], colors[color][1], colors[color][2]));
  }
  centerToBorderCounter++;
  delay(3000);

  if (centerToBorderCounter > LEDPARBANDE)  {
    
  }
}


