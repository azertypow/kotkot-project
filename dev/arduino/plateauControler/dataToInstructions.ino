void dataToInstructions(){
  Serial.print("directive: ");
  Serial.println(directive);

  // lancer intro
  if(directive == "intro"){
    Serial.println("intro lance");
    run_Intro = true;
  }

  // lancer le random en attente de placement de tous les joueurs
  else if(directive == "random attente placement"){
    // couper intro en jeu
    Serial.println("intro coupe");
    run_Intro = false;
    
    // lancer intro random placement
    Serial.println("random placement lance");
    run_RandomPlacement = true;
    
  }

  else if(directive == "partie intro"){
    Serial.println("partie introoooooooooooo");
  }
}
