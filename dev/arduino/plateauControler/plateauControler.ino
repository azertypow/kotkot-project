void setup() {
  Serial.begin(250000);
}

void loop() {
  int sensorValue = analogRead(A0);
  Serial.println(sensorValue);
}
