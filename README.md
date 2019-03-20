# Meet&Study

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

### Tech

Meet&Study uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [jQuery] - duh

And of course Meet&Study itself is open source with a [public repository][dill]
 on GitHub.

### Installation

Dillinger requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

para bajar la app:
en consola,
```sh
git clone https://github.com/johnjce/meet-study.git
```

Para instalar ionic:
en consola, 
```sh
npm install -g ionic
```
Para instalar la app:
en consola,
```sh
cd meet-study
npm install
```


Aveces en mac presenta problemas al realizar mpn install, algo de gyp, en la mayoria de casos se soluciona asi:
```sh
mac:
xcode-select --install
```

En Windows?  inicie PowerShell como Administrator y ejecute:

```
npm install --global windows-build-tools
```

o, si esta usando Yarn:

```
yarn global add windows-build-tools
```

![Gif](https://user-images.githubusercontent.com/1426799/45007904-bde9f280-afb4-11e8-8a35-c77dffaffa2a.gif)

Despues de la instalación, npm automaticamente descarga e instala Visual
C++ Build Tools. Si aún no está instalado, también instalará Python 2.7, configurando su máquina y npm adecuadamente.

Estas herramientas son [necesarias para compilar módulos nativos] (https://github.com/nodejs/node-gyp).

Para más información y para usuarios de Windows
```sh
https://github.com/nodejs/node-gyp/#on-macos
```

### Estructura de ficheros en la app

 ## File Structure
 ```
 .
 ├── LICENSE
 ├── README.md
 ├── config.xml
 ├── ionic.config.json
 ├── package.json
 ├── resources
 ├── src
 │   ├── index.html
 │   ├── app
 │   │   ├── app.component.ts
 │   │   ├── app.html
 │   │   ├── app.module.ts
 │   │   ├── app.scss
 │   │   └── main.ts
 │   ├── assets
 │   │   └── mock
 │   │       └── msg-list.json                 * mock json
 │   │   └── icon
 │   │       └── favicon.ico
 │   │   └── to-user.jpg
 │   │   └── user.jpg
 │   ├── components/emoji-picker               * emoji-picker component
 │   │   └── emoji-picker.html
 │   │   └── emoji-picker.module.ts
 │   │   └── emoji-picker.scss
 │   │   └── emoji-picker.ts
 │   ├── providers
 │   │   └── chat-service.ts                  * chat-service
 │   │   └── emoji.ts                         * emoji-provider
 │   ├── pipes
 │   │   └── relative-time.ts                 * relative time pipes
 │   ├── pages
 │   │   ├── home
 │   │   │   ├── home.html        
 │   │   │   ├── home.scss         
 │   │   │   └── home.ts           
 │   │   ├── chat                             * chat page
 │   │   │   ├── chat.html                    * chat template
 │   │   │   ├── chat.scss                    * chat stylesheet
 │   │   │   ├── chat.ts                      * chat code
 │   │   │   └── chat.module.ts               * chat module
 │   │   └── tabs
 │   │       ├── tabs.html
 │   │       └── tabs.ts
 │   ├── service-worker.js
 │   └── theme
 │       └── variables.scss
 ├── tsconfig.json
 └── tslint.json
 ```

 ## Environment
 ```
cli packages: 

    @ionic/cli-utils  : 1.12.0
    ionic (Ionic CLI) : 3.13.1

global packages:

    Cordova CLI : 7.0.1 

local packages:

    @ionic/app-scripts : 2.1.4
    Cordova Platforms  : android 6.0.0 browser 4.1.0 ios 4.1.1
    Ionic Framework    : ionic-angular 3.7.1

System:

    ios-deploy : 1.9.1 
    ios-sim    : 6.0.0 
    Node       : v6.9.2
    npm        : 5.4.2 
    OS         : macOS Sierra
    Xcode      : Xcode 9.0 Build version 9A235 


 ```
