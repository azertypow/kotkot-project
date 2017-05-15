int playersNumber = 2;

void setup() {
  Serial.begin(250000);
}

void loop() {
  for(int i = 0; i < playersNumber; i++ ){
    String potenValu = readPotentiometreValue(i);
    Serial.print( potenValu );
  }

    Serial.print(" autre ");

    String a = readPotentiometreValue(0);
    Serial.print( a );

    Serial.print("\r\n");
}

String readPotentiometreValue(int playerIndex){
  String stringInfo = String(playerIndex)+": ";
  int analogPort = playerIndex;
  String sensorValue = stringInfo + analogRead(analogPort) + " ";
  return sensorValue;
}
