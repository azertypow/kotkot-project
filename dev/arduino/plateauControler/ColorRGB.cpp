#include <Arduino.h>
#include "ColorRGB.h"
ColorRGB::ColorRGB(int r, int g, int b){
  setColor(r, g, b);
}
void ColorRGB::setColor(int r, int g, int b){
  color[0] = r;
  color[1] = g;
  color[2] = b;
  for(int i=0; i<3; i++){
    if(color[i] < 0){
      color[i] = 0;
    }
    else if(color[i] > 255){
      color[i] = 255;
    }
  }
}
int *ColorRGB::getColor(){
  return color;
}
int ColorRGB::r(){
  return color[0];
}
int ColorRGB::g(){
  return color[1];
}
int ColorRGB::b(){
  return color[2];
}
