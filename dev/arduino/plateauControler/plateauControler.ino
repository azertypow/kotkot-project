#include <Adafruit_NeoPixel.h>

// players
#define PLAYERSNUMBER 2

// pixels led
#define LEDPIN 8
#define NUMPIXELS 16

// setup the NeoPixel library
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, LEDPIN, NEO_GRB + NEO_KHZ800);

void setup() {
  Serial.begin(250000);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }

  // initializes NeoPixel library
  pixels.begin();
}

void loop() {

  // send potentiometre value for all players
  sendPententiometreUsersValue();
  ///  fin info
  Serial.print("\r\n");

  // NeoPixel
  lightUpLeds();
}
int count = 0;
void lightUpLeds(){
  if(count == 0){
    pixels.setPixelColor(0, pixels.Color(0,150,0));
  }
  pixels.show();
  count ++;
}
