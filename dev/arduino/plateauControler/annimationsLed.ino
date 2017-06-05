// lancer à la connection entre arduino et nodejs
int intro_count = 0;
boolean intro_ledMonte = true;
void play_Intro(){

  // assurer que le serial port ne se soit pas remplit entre temps
  if(Serial.available() > 0){
    Serial.println("des donnees sont arrivees en cour de route");
  }
  else {
    
    // animation loop intro
    if(intro_ledMonte){
      lightUpLedsFromTo(MAXLEDINTENSITY, 0, MAXLEDINTENSITY, intro_count ,intro_count + 1);
    }
    else {
      lightUpLedsFromTo(0, 0, 0, intro_count ,intro_count + 1);
    }
  
    // attente
    delay(1000);
  
    // savoir si on increment ou decrement les leds
    if(intro_count == NUMPIXELS - 1){
      intro_ledMonte = false;
    }
    else if (intro_count == -1){
      intro_ledMonte = true;
    }
  
    // incrementé le conteur
    if(intro_ledMonte){
      intro_count++;
    }
    else {
      intro_count--;
    }
  }
}

// lancer lors de l'attente de positionnement de tous les joueurs
int random_placement_count = 0;
void play_random_placement(){
  lightUpallLeds(MAXLEDINTENSITY, MAXLEDINTENSITY, MAXLEDINTENSITY);
  Serial.println("random placement ok");
  run_RandomPlacement = false;
}
