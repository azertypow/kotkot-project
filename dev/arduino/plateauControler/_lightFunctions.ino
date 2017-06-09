// bandes devant les joueurs [STRIPLEDSNUMBER][PLAYERSNUMBER]
void lightUpPlayersStrip(int player) { // player = numéro de la bande
  for (int j = 0; j < STRIPLEDSNUMBER; j++) {
    // STRIPLEDNUMBER = nombre de leds par bande
    // j = numéro de la led sur la bande
    int ledId = j + STRIPLEDSNUMBER * player;
    color = chooseRandomColor();
    pixels.setPixelColor(ledId, pixels.Color(colors[color][0], colors[color][1], colors[color][2]));
  }
  //pixels.show();
}

void allPlayersFromBeginToEnd (int posLed, int _r, int _g, int _b) {
  for (int i = 0; i < PLAYERSNUMBER; i++) {
    // player = numéro de la bande
    // STRIPLEDNUMBER = nombre de leds par bande
    // j = numéro de la led sur la bande
    int ledId = posLed + STRIPLEDSNUMBER * i;
    pixels.setPixelColor(ledId, pixels.Color(_r, _g, _b));
  }
}



// nombre de lois humaniste [LAWNUMBER]
void lightUpHumanisteLeds() {

  for (int i = NUMPIXELS - 11; i < NUMPIXELS - 1; i++) {
    pixels.setPixelColor(i, pixels.Color(0, BRIGHTNESS, BRIGHTNESS));
  }

  //  pixels.show();
}

// nombre de lois progressiste [LAWNUMBER]
void lightUpProgressisteLeds() {
  for (int i = NUMPIXELS - 21; i < NUMPIXELS - 11; i++) {
    pixels.setPixelColor(i, pixels.Color(BRIGHTNESS, BRIGHTNESS, 0));
  }
  //pixels.show();
}

// leds devant les jouers [1][PLAYERSNUMBER]
void lightUpPlayersLeds(int player) {
  int firstPlayerLed = 120; //les leds des joueurs vont de 120 à 128
  pixels.setPixelColor(firstPlayerLed + player, pixels.Color(255, 0, 0));
}

// leds coefficient du vote devant les jouers [COEFFICIENTSLEDNUMBER][PLAYERSNUMBER]
// la fonction allume seulement la led supplémentaire
void lightUpCoefficientLeds(int player, int nbActuelDeVotes) {
  // les leds vont de 80 à 119
  int ledId = 80 + nbActuelDeVotes + COEFFICIENTSLEDNUMNER * player;
  pixels.setPixelColor(ledId, pixels.Color(0, 0, 255));
}

// led seul au centre
void lightUpAloneCenterLed(int r, int g, int b) {
  pixels.setPixelColor(NUMPIXELS - 1, pixels.Color(r, g, b));
}
