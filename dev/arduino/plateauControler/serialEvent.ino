String info = "";
void parseSerialReceived(String data){
  info = info + data;
  
  // regarder si c'est la fin du message
  if(info.endsWith(SERIAL_CHARACTER_INTI) || info.endsWith(SERIAL_CHARACTER_RESET) || info.endsWith(SERIAL_CHARACTER_END)){
    allDataReceivedPrevious = true; // noté le fais que toutes les data on été recu lors de ce passage
    Serial.println(info);
    Serial.println(info);
    info = "";
  }
}
