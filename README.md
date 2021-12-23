# API-Sing-me-a-Song

<br/>

<div align="center">
  <img src="https://c.tenor.com/0hL1Ku3kE80AAAAC/dinosandcomics-dinosaur.gif" width="60%" height="auto" frameBorder="0" class="giphy-embed" allowFullScreen>
</div>

<!-- https://tenor.com/view/dinosandcomics-dinosaur-trex-vibing-chilling-gif-19580804-->

<br/>

<h2 align="center" style='color:#3e77b6; font-size:36px;' width="30%">
  Sing me a song is an API for anonymous song recommendation. The more people like a recommendation, the more likely it is to be recommended to others 🙂
</h2>
  
<!-- <br/> -->

## How to install and run on terminal

#### It is necessary to install node: https://nodejs.org/en/download/

<br/>

### - Clone repository
```
  git clone https://github.com/FranciscaFigueiredo/API-Sing-me-a-Song.git
```

<br/>

### - Install dependencies

```
  npm i
```
or
```
  npm install
```

<br/>

### - Start

```
  npm start
```
<br/>

### - Prepare the backend and database

- Use the api_dump.sql file to create the project database

- Edit the .env.example file with the necessary data to connect to your bank.

<br/>

## Documentation
- POST /recommendations

  Adiciona um ponto à pontuação da recomendação. Não espera nada no corpo.
```
  {
    "name": "Falamansa - Xote dos Milagres",
    "youtubeLink": "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  }
```

</br>

- POST /recommendations/:id/uwpvote

  - Adds a point to the recommendation score. Do not expect anything in the body.

</br>

- POST /recommendations/:id/downvote

  - Removes a point from the recommendation score. Do not expect anything in the body.
  - If the score falls below -5, the recommendation is deleted.

</br>

- GET /recommendations/random
  - 30% of the song recommendations will be songs with a score between -5 and 10 points, while 70% will be songs with a score above 10 points.
  - If you only have songs with a score between -5 and 10 or above 10, the answer will be completely random.
  - If there is no song registered, the 404 status must be returned

  A resposta tem o formato:

  ```
    {
      "id": 1,
      "name": "Chitãozinho E Xororó - Evidências",
      "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
      "score": 245
    },
  ```

</br>

- GET /recommendations/top/:amount
  - Lists the songs with the highest score and their score. The top x songs (parameter :amount of the route) should be returned, sorted by score (highest first).
  
  A resposta tem o formato:
  ```
  [
    {
      "id": 150,
      "name": "Chitãozinho E Xororó - Evidências",
      "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
      "score": 245
    },
    {
      "id": 12,
      "name": "Falamansa - Xote dos Milagres",
      "youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
      "score": 112
    },
    ...
  ]
  ```

## **Technologies**

![Node Badge](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postgres Badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest Badge](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

### **Tooling:**
![ESLint](https://img.shields.io/badge/ESLint-7c7ce9?style=for-the-badge&logo=ESLint)
![husky](https://img.shields.io/badge/Husky-b0b0d5?style=for-the-badge)
