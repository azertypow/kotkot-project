//String readPotentiometreValue(int playerIndex){
//  String stringInfo = "\""+String(playerIndex)+"\": ";
//  int analogPort = playerIndex;
//  String sensorValue = stringInfo + analogRead(analogPort);
//  return sensorValue;
//}
//
//void sendPententiometreUsersValue(){
//  for(int i = 0; i < PLAYERSNUMBER; i++ ){
//    String potenValu = readPotentiometreValue(i);
//
//    if(i == 0){
//      Serial.print("{"); // ouverture json
//    }
//
//    if(i < (PLAYERSNUMBER - 1)){
//      Serial.print( potenValu ); // valeur
//      Serial.print(","); // virgule pour valeur suivante
//    } else {
//      Serial.print( potenValu ); // valeur, pas de virgule
//      Serial.print("}"); // fermeture json
//    }
//  }
//}
