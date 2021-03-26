# My Momentum

Momentum은 chrome momentum을 심화시켜 만든 todo application입니다.

# Major Features

❤ Get Weather through current City Data  
&nbsp;&nbsp;&nbsp;&nbsp; 유저의 도시 데이터로 날씨정보 받아오기 [Weather API](https://weatherstack.com/)  
🧡 Manage Todo and link by Folder  
&nbsp;&nbsp;&nbsp;&nbsp; Todo와 link를 폴더별로 관리가능  
💛 Mark check when Todo is done  
&nbsp;&nbsp;&nbsp;&nbsp; Todo완료하면 체크표시 눌러서 업데이트 가능  
💚 Change current City or Delete the Folder or Todo,Link
&nbsp;&nbsp;&nbsp;&nbsp; 현재 도시를 변경하거나 폴더,Todo,Link 삭제가능

# URL

💗My Momentum : <https://my-momentums.herokuapp.com/>

# Tech/framework used

💗 MAIN  
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![Node.js](http://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)

💗 TOOLS  
![Webpack](https://img.shields.io/badge/-Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/-Babel-F9DC3E?style=for-the-badge&logo=Babel&logoColor=white)
![Handlebars](http://img.shields.io/badge/Node_view_Engine-Handlebars-FF69B4?style=for-the-badge&logo=Node.js&logoColor=white)  
![Font Awsome](https://img.shields.io/badge/-Font_Awesome-339AF0?style=for-the-badge&logo=Font_Awesome&logoColor=white)

💗 SERVER & DB  
![Express](https://img.shields.io/badge/-Express-191919?style=for-the-badge&logo=Node.js&logoColor=white)
![Firebase](https://img.shields.io/badge/-Firebase-orange?style=for-the-badge&logo=Firebase&logoColor=white)

💗 DEPLOY  
 ![Heroku](https://img.shields.io/badge/-Heroku-430098?style=for-the-badge&logo=Heroku&logoColor=white)

# Structure

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

# Screenshots

<img src="https://github.com/summer-kim/Momentum/blob/main/public/image/momentumMain.png" width="825" height="375">
<img src="https://github.com/summer-kim/Momentum/blob/main/public/image/momentumFolder.png" width="825" height="375">
