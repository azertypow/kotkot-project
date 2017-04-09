# kötköt | application jeu

## 1. installation du projet

###1.1 ce placer avec le terminal dans le dossier racine du projet en cour

###1.2 installer les dependences

lancer depuis le terminal :

    npm install

###1.3 installer utilitaire pour le developement

lancer depuis le terminal :

    npm run install-dev-environement

## 2. utilisation

###2.2 browser app

supprimer le ./prod/browser/main.js.map et le ./prod/browser/main.js 

    npm run clean
    
compiler simplement les fichier typescript ./dev/browser/*.tsx? vers ./prod/browser/main.js
    
    npm run webpack
    
compiler les fichier typescript pour le production (lance la fonction clean et la fonction webpack)
    
    npm run build
    
compiler les fichier typescript en créant un fichier ./prod/browser/main.js.map
    
    npm run build-dev
    
compiler les fichier typescript a chaque modification d'un fichier typescript
    
    npm run start-dev-compilation
    
creer un serveur de devellopement, compiller a chaque modification et rafraichir automatiquement la page du navigatuer
    
    npm run start-dev-server

#### notes
si utilisation du server phpStorm, regler l'autorisation de requette sans autorisation pour ne pas bloquer les fichier source map 

    Settings -> Build, execution, development -> Debugger - >Allow unsigned request