#define SERIAL_BUFFER_SIZE 256
#include <Adafruit_NeoPixel.h>

// players
#define PLAYERSNUMBER 8       // nombre de joueurs
#define STRIPLEDSNUMBER 10     // nombre de leds par bandes devant les joueurs
#define LAWNUMBER 10          // nombre de leds pour les lois de chaques parties
#define COEFFICIENTSLEDNUMBER 5  // nombre de led pour les cohéficient de vote de qhasue jouers

// pixels led
#define LEDPIN 8
#define NUMPIXELS 149
#define MAXLEDINTENSITY 50
#define DELAY 50

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

#define BRIGHTNESS 50
int color;
int r;
int g;
int b;

int rGoal;
int gGoal;
int bGoal;
int degrade;

boolean startIntro = true; //
int monte = 1;
int i;

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

// setup the NeoPixel library
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, LEDPIN, NEO_GRB + NEO_KHZ800);

int index = 0;

void setup() {
  Serial.begin(115200); // 9600, 19200, 115200
  // initializes NeoPixel library
  pixels.begin();
}

void loop() {

  // lightUpHumanisteLeds();
  // lightUpProgressisteLeds();

  effaceTout();

  // plateauClignote(); // clignotement aléatoire
  // intro(0,2); // genre de clignotement qui fait le tour du plateau
  // smoothIntroColors(); // changement des couleurs doux
  lightUpPlayersStrip(7);
  lightUpPlayersLeds(2);
  lightUpCoefficientLeds(2, 2);
  lightUpAloneCenterLed(0, 50, 0);

  pixels.show();
  delay(DELAY);
}

void smoothIntroColors() {

  if (startIntro) {
    i = 0;
    r = 0;
    b = BRIGHTNESS;
    g = 0;
    startIntro = false;
    degrade = 3;
  }

  //  smoothIntro(r,0,b);

  if (monte == 1) {
    r += degrade;
    b -= degrade;
    if (int(random(3)) > 1) {
      g += degrade;
    }

  }

  if (monte == -1) {
    r -= degrade;
    b += degrade;
    if (g > 0) {
      g -= degrade;
    }
  }

  if (r >= BRIGHTNESS || r <= 2 || b >= BRIGHTNESS || b <= 2) {
    monte = -monte;
  }

  allPlayersFromBeginToEnd(i, r, g, b);

// permettra de gérer les couleurs du dégradé
//  if (i >= NUMPIXELS) {
//    i = 0;
//    int dice = int(random(3));
//    if (dice == 0 && r == g) {
//      int tempr = r;
//      r = g;
//      g = tempr;
//    } else if (dice == 1 && g == b) {
//      int tempg = g;
//      g = b;
//      b = tempg;
//    } else if (dice == 2 && b == r) {
//      int tempb = b;
//      b = r;
//      r = tempb;
//    }
//  }

  i++;

}

void smoothIntro(int _r, int _g, int _b) {
  for (int i = 0; i < NUMPIXELS; i++) {
    pixels.setPixelColor(i, pixels.Color(_r, _g, _b));
  }
}

void intro(int color, int goalColor) {

  effaceTout();

  if (startIntro) {
    setNewColor(colors[color][0], colors[color][1], colors[color][2]);
    setGoalColor(colors[goalColor][0], colors[goalColor][1], colors[goalColor][2]);
    degrade = 1;
    startIntro = false;
  }

  //  if(index<STRIPLEDSNUMBER) {
  //    allPlayersFromBeginToEnd(index, r, g, b);
  //    index++;
  //  } else if (index == STRIPLEDSNUMBER) {
  //    index = 0;
  //  }

  if (r >= rGoal) {
    r -= degrade;
  } else if (r <= rGoal) {
    r += degrade;
  }
  if (b >= bGoal) {
    b -= degrade;
  } else if (b <= bGoal) {
    b += degrade;
  }

  if (index < NUMPIXELS) {
    allPlayersFromBeginToEnd(index, r, g, b);
    allPlayersFromBeginToEnd(index + 1, r, g, b);
    index += 1;
  } else if (index >= NUMPIXELS) {
    index = 0;
  }

}



void plateauClignote() {
  for (int i = 0; i < NUMPIXELS; i++) {
    int ledId = i;
    int dice = int(random(3)); // on tire un dé pour avoir un threshold pour ne pas allumer toutes les leds
    if (dice > 1) {
      color = chooseRandomColor();
      pixels.setPixelColor(ledId, pixels.Color(colors[color][0], colors[color][1], colors[color][2]));
    }
    else { // 1 led sur 2 n'est pas allumée
      pixels.setPixelColor(i, pixels.Color(0, 0, 0));
    }
  }
}

