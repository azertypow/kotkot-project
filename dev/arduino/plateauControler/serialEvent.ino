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
