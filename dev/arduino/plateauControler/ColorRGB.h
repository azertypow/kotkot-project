#ifndef ColorRGB_H
#define ColorRGB_H // si Morse_h n'est pas défini
#include <Arduino.h> // On le défini
class ColorRGB{
  public:
  ColorRGB(int r, int g, int b);
  void setColor(int r, int g, int b);
  int *getColor();
  int r();
  int g();
  int b();
  private:
  int color[3];
};
#endif // Fin si
