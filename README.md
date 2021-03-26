<h1 align="center"> 📌<em>My Momentum</em></h1>
<p align="center"><em>Momentum은 chrome momentum을 심화시켜 만든<br/> <strong>Todo application</strong>입니다.</em></p>
<br/>

<h1 align="center"> 🌎<em>URL</em></h1>
<p align="center"><em>💗 My Momentum : <a href="https://my-momentums.herokuapp.com">Link</a></em></p>
<br/>

<h1 align="center"> 🌼<em>Improvement</em><br/>(배운것들)</h1>
<br/>
<p align="center"><em>❤️ HTTP Method</em></p>

```
    GET METHOD와 달리, POST는 보안이 엄격한 것을 배웠습니다.
    GET을 사용해서 데이터를 불러올때는, params로 정보를 노출시켜도 되지만,
    POST는 body를 통해 노출되지 않으며, 설정을 통해 header의 보안토큰을 요구하게 만들 수 있기 때문입니다..
```

<p align="center"><em>🧡 Cookie, Session, Token</em></p>

```
    GET METHOD와 달리, POST는 보안이 엄격한 것을 배웠습니다.
    GET을 사용해서 데이터를 불러올때는, params로 정보를 노출시켜도 되지만,
    POST는 body를 통해 노출되지 않으며, 설정을 통해 header의 보안토큰을 요구하게 만들 수 있기 때문입니다..
```

<p align="center"><em>💛 Upgrade Javascript Skill</em></p>

```javascript
    Javascript의 전반적인 실력이 향상됨을 느꼈습니다.
    js파일 간의 함수와 변수를 자유롭게 사용할 수 있고
    EventListener로 받아온 Data를 집어넣기 위해 DOM객체를 특정하여
    classList,innerHTML,insertAdjacentHTML뿐만 아니라
    .splice(),.map(),Array.from(),Object.keys()등 기본적인 함수도 자유자재로 사용할 수 있게 되었습니다.
```

<p align="center"><em>💚 NodeJS View Engine:handlebar</em></p>

```
    GET METHOD와 달리, POST는 보안이 엄격한 것을 배웠습니다.
    GET을 사용해서 데이터를 불러올때는, params로 정보를 노출시켜도 되지만,
    POST는 body를 통해 노출되지 않으며, 설정을 통해 header의 보안토큰을 요구하게 만들 수 있기 때문입니다..
```

 <br/>

<h1 align="center"> 🛠<em>Tech/framework used</em></h1>
<br/>
<p align="center"> 💗 <em>MAIN</em> 💗<br/>
  <img src="https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white"/>&nbsp
  <img src="http://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/><br/>
</p>
 <br/>
<p align="center"> 💗 <em>TOOLS</em> 💗<br/>
  <img src="http://img.shields.io/badge/Node_view_Engine-Handlebars-FF69B4?style=for-the-badge&logo=Node.js&logoColor=white"/></a><br/>
  <img src="https://img.shields.io/badge/-Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/-Babel-F9DC3E?style=for-the-badge&logo=Babel&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/-Font_Awesome-339AF0?style=for-the-badge&logo=Font_Awesome&logoColor=white"/></a>&nbsp
</p>

<p align="center"> 💗 <em>SERVER & DB</em> 💗 <br/>
  <img src="https://img.shields.io/badge/-Express-191919?style=for-the-badge&logo=Node.js&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/-Firebase-orange?style=for-the-badge&logo=Firebase&logoColor=white"/></a>&nbsp
</p>

<p align="center"> 💗 <em>DEPLOY</em> 💗<br/>
  <img src="https://img.shields.io/badge/-Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white"/></a>&nbsp
 </p>
 <br/>

<h1 align="center"> 🎯<em>Major Features</em></h1>
<br/>
<p align="center"><em>❤ Get Weather through current City Data</br>유저의 도시 데이터로 날씨정보 받아오기 <a href="https://weatherstack.com">Weather API</a></em></p>
<p align="center"><em>🧡 Manage Todo and link by Folder</br>Todo와 link를 폴더별로 관리가능</em></p>
<p align="center"><em>💛 Mark check when Todo is done </br>Todo완료하면 체크표시 눌러서 업데이트 가능 </em></p>
<p align="center"><em>💚 Change current City or Delete the Folder or Todo,Link</br>현재 도시를 변경하거나 폴더,Todo,Link 삭제가능</em></p>
 <br/>
 <br/>
 
<h1 align="center"> ☔️<em>Structure</em></h1>

```
Momentum
├── public
│   ├── css files
│   ├── img files
│   └── js
│       ├── displayFolder.js
│       ├── displayTodos.js
│       ├── displayFolderWeather.js
│       └── errAlert.js
│       └── fetch
│           ├── getTime.js
│           ├── getTodo.js
│           └── getWeather.js
├── views
│   ├── index.jbs
│   ├── login.jbs
│   ├── register.jbs
│   ├── layout
│   │   └── layout.hbs
│   └── partials
│       ├── head.hbs
│       ├── todos.hbs
│       └── weather.hbs
├── server
│   ├── db.js
│   ├── middleware.js
│   └── routes
│       ├── weatherRouter.js
│       ├── authRouter.js
│       └── todoRouter.js
└── server.js
```

<br/>
<h1 align="center"> 📷<em>Screenshots</em></h1>

<img src="https://github.com/summer-kim/Momentum/blob/main/public/image/momentumMain.png" width="825" height="375">
<img src="https://github.com/summer-kim/Momentum/blob/main/public/image/momentumFolder.png" width="825" height="375">
