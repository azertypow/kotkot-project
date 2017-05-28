void dataToInstructions(){  
  Serial.print("directive: ");
  Serial.println(directive);
  if(directive == "check"){
    // NeoPixel
    lightUpAllLeds(IntLed, IntLed, 0);
    Serial.println("led checked");
  }
}
