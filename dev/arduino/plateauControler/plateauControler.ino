int playersNumber = 2;

void setup() {
  Serial.begin(250000);
  
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
}

void loop() {
  for(int i = 0; i < playersNumber; i++ ){
    String potenValu = readPotentiometreValue(i);

    if(i == 0){
      Serial.print("{"); // ouverture json
    }

    if(i < (playersNumber - 1)){
      Serial.print( potenValu ); // valeur
      Serial.print(","); // virgule pour valeur suivante
    } else {
      Serial.print( potenValu ); // valeur, pas de virgule
      Serial.print("}"); // fermeture json
    }
  }

//  Serial.print(" autre ");
//  String a = readPotentiometreValue(0);
//  Serial.print( a );

  //  fin info
  Serial.print("\r\n");
}

String readPotentiometreValue(int playerIndex){
  String stringInfo = "\""+String(playerIndex)+"\": ";
  int analogPort = playerIndex;
  String sensorValue = stringInfo + analogRead(analogPort);
  return sensorValue;
}

// lecture des info recu par le server
String info = "";
void serialEvent(){
  int incomingByte = 0;   // for incoming serial data
  incomingByte = Serial.read();
  char incomingChar = incomingByte; // convert to char
  if (String(incomingChar) == "\n"){
    Serial.println("recu");
    Serial.println(info);
    info = "";
  }
  else {
    String genere = String(incomingChar);
    info = info + genere;
  }
}
