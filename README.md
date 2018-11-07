# CL-front
Front end of the map project

Michel forever tonight.

# Instalation du projet : 

## Si vous êtes sur windows : 
- https://gitforwindows.org/

## Installer node : 
 - prendre la version "current": https://nodejs.org/en/.

## Installer Angular Cli 
Dans un terminal executer : 

~~~~
npm install -g @angular/cli	
~~~~

## Clone du repo

~~~~
git clone https://github.com/2018-19-M2GI-Metz/CL-front.git
~~~~

## Instalation des dépendances

~~~~
npm install 
~~~~
ou 
~~~~
npm i 
~~~~

Si une erreur apparaît par rapport a node-gyp, executer :
~~~~
# Windows: 
npm install --global windows-build-tools

#Linux:
sudo apt install build-essential

~~~~

## Tester si l'application compile et le serveur dev démarre
~~~~
npm run start
~~~~
Si tout vas bien vous devriez voir "Compiled successfully" et une page de votre navigateur s'ouvrira sur http://localhost:4200.

Ferme le terminale, on va passer par vscode pour lancer l'app par la suite.

# Installer VS Code

Lien pour télécharger : https://code.visualstudio.com/Download

- Dans VS Code, file, open workspace et ouvrir le fichier "cl-front.code-workspace",

- Installer les extentions recommandés, via le fenêtre qui va s'ouvrir en bas à droite.

- Après que le extentions soit toutes installées, appuye sur F1 et écrit "recharger la fenetre", puis entrer.
- une sous fenêtre nommée "npm scripts" est maintenant présent et va permettre dans lancer tout les scripts de l'application (ils sont défini dans le fichier package.json ).