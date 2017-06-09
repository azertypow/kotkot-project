// allumer toutes les leds
void lightUpallLeds(int r, int g, int b){
  for(int i = 0; i < NUMPIXELS; i++){
    pixels.setPixelColor(i, pixels.Color(r,g,b));
  }

  // mise a jour des leds
  pixels.show();
}

// allumer led de … a …
void lightUpLedsFromTo(int r, int g, int b, int ledIndexFrom, int ledIndexTo){
  for(int i = ledIndexFrom; i < ledIndexTo; i++){
    pixels.setPixelColor(i, pixels.Color(r,g,b));
  }
  
  // signaler a nodejs la mise a jour des led
  Serial.println("animate on");
  
  // mise a jour des leds
  pixels.show();
    
  // signaler a nodejs la mise a jour des led
  Serial.println("animate off");
}

//–––––individuel–––––//
// ordre de connection des leds [PlayersStrip]->[CoefficientLeds]->[PlayersLeds]->[HumanisteLeds]->[ProgressisteLeds]->[seul]

// bandes devant les joueurs [STRIPLEDSNUMBER][PLAYERSNUMBER]
void lightUpPlayersStrip(){
  for(int i = 0; i < PLAYERSNUMBER; i++){
    for(int j = 0; j < STRIPLEDSNUMBER; j++){
      
    }
  }
  pixels.show();
}

// nombre de lois humaniste [LAWNUMBER]
//void lightUpHumanisteLeds(){
//  for(int i = 0; i < PLAYERSNUMBER; i++){
//    
//  }
//  pixels.show();
//}

// nombre de lois progressiste [LAWNUMBER]
//void lightUpProgressisteLeds(){
//  for(int i = 0; i < PLAYERSNUMBER; i++){
//    
//  }
//  pixels.show();
//}

// leds devant les jouers [1][PLAYERSNUMBER]
void lightUpPlayersLeds(){
  for(int i = 0; i < PLAYERSNUMBER; i++){
    
  }
  pixels.show();
}

// leds coefficient du vote devant les jouers [COEFFICIENTSLEDNUMNER][PLAYERSNUMBER]
void lightUpCoefficientLeds(){
  for(int i = 0; i < PLAYERSNUMBER; i++){
    
  }
  pixels.show();
}

// led seul au centre
//void lightUpAloneCenterLed(int r, int g, int b){
//  pixels.setPixelColor(NUMPIXELS, pixels.Color(r,g,b));
//  pixels.show();
//}
