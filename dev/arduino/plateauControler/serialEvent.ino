String info = "";

// traité les données en cour recu dans le serial port
void parseSerialReceived(String data){
  
  // stocké la totalité de ce qui à été recu, sans avoir eu un caractere special (fin, initialisation, reset…)
  info = info + data;
  
  // regarder si c'est la fin du message
  if(info.endsWith(SERIAL_CHARACTER_RESET) || info.endsWith(SERIAL_CHARACTER_END)){

    // noté le fais que toutes les data on été recu lors de ce passage
    allDataReceivedPrevious = true;
    Serial.println(info);
    
    // vider le stockage des data recu
    info = "";
  }
  
  // regarder si c'est une demande d'initialisation de connection
  else if (info.endsWith(SERIAL_CHARACTER_INTI)){
    
    // noté le fais que toutes les data on été recu lors de ce passage
    allDataReceivedPrevious = true;

    // vider le stockage des data recu
    info = "";

    // notifier la connection reussit avec node
    serialConnected = true;
    
    // datas traités (juste demande d'initialisation)
    processedData = true;

    // informer node de la connection ok
    Serial.println("connected");
  }
}
