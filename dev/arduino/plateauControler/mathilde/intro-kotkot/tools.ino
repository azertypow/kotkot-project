// renvoie une couleur au hasard
int chooseRandomColor() {
  int dice = int(random(10));
  if (dice == 0) {
    return 0;
  } else if (dice == 1) {
    return 1;
  } else if (dice == 2) {
    return 3;
  } else if (dice == 3) {
    return 4;
  } else {
    return 2;
  }
}

// clear tout
void effaceTout() {
  for (int i = 0; i < NUMPIXELS ; i++) {
    pixels.setPixelColor(i, pixels.Color(0, 0, 0));
  }
}

// fonctions pour un effet de dégradé - vont probablement être bientôt supprimées
void setNewColor(int _r, int _g, int _b) {
  r = _r;
  g = _g;
  b = _b;
}

void setGoalColor(int _rGoal, int _gGoal, int _bGoal) {
  rGoal = _rGoal;
  gGoal = _gGoal;
  bGoal = _bGoal;
}
