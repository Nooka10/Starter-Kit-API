# The Movie Challenge

Pour réussir ce challenge, nous vous laissons le choix de développer soit une application frontend (Movie Explorer), soit une application backend (Movie Time).

Le rendu se fera via [ce formulaire Google Forms](https://goo.gl/nwZUVk) dans lequel nous vous demandons notamment l'URL de votre application, ainsi que celui de votre repository GitHub (contenant votre code ainsi qu'un fichier README.md qui explique succinctement comment démarrer et tester votre application).

## Option 1 : Movies Explorer (frontend)

**Prélude**

_Même si Benoît aime énormément écrire des tests en JavaScript, c'est aussi et avant tout un grand cinéphile ! Lorsqu'il rentre chez lui le soir après une dure journée de labeur, il se délecte d'un moment privilégié devant un film méticuleusement sélectionné au préalable. Chaque jour est une nouvelle chance d'explorer de nouveaux horizons cinématographiques et de se retrouver projeté dans des mondes inouïs tantôt féériques, tantôt dystopiques, tantôt romantiques. Malheureusement, notre héros met parfois beaucoup de temps pour sélectionner **le** film à visionner, car cela n'est pas chose aisée ! Pouvez-vous l'aider en développant une petite application frontend d'assistance ?_

**Introduction**

Si vous optez pour cette option vous allez devoir développer une application web de suggestion de films. Dans un premier temps, l’utilisateur verra afficher une liste de films, puis devra sélectionner dans cette liste les films qu’il a déjà visionnés et appréciés. Après avoir fait son choix, l’application lui proposera une liste de suggestions de films prochainement projetés en salle, basée sur ses préférences.

**Consigne**

- Mettre en place un environnement de développement frontend basé sur un framework de votre choix (React, Vue.js, Angular, ou autre).

- Utiliser l’API publique de [TMDb](https://developers.themoviedb.org/3/getting-started/introduction) afin de récupérer les données des films. Pour éviter de vous faire perdre du temps précieux, vous utiliserez l'API key que nous vous fournissons et suivrez les instructions dans les sections qui suivent concernant l'utilisation de l'API.

  Comme vous serez plusieurs à tester l'API simultanément, il sera nécessaire de contourner la limitation liées au nombre de requêtes par adresse IP. Une solution est par exemple d'utiliser le proxy [dev-proxy-server](https://github.com/paulnta/dev-proxy-server).

- Vous mettrez l'accent sur la partie fonctionnelle plutôt que sur le design ou l'expérience utilisateur. Notez que l'application doit tout de même être un minimum utilisable et intuitive.

- Implémenter les fonctionnalités demandées dans les étapes qui suivent.
- Déployer votre application en ligne. Ne perdez pas trop de temps sur ce point, et mettez une priorité plus élevée sur les autres étapes si besoin.




### 1. Films populaires (3pt)

Dans cette première étape, nous demandons d'afficher une liste de films. Pour cela, vous devez écrire un script qui récupère les données de l’endpoint suivant :

```
https://api.themoviedb.org/3/movie/popular?page=1&api_key=<YOUR_API_KEY>
```

Cette requête retourne la première page de résultats (à savoir, les 20 films les plus populaires). Voici un exemple de réponse :

```js
{
  "page": 1,
  "total_results": 19854,
  "total_pages": 993,
  "results": [
    {
      "vote_count": 2070,
      "id": 297802,
      "video": false,
      "vote_average": 6.9,
      "title": "Aquaman",
      "popularity": 499.057,
      "poster_path": "/5Kg76ldv7VxeX9YlcQXiowHgdX6.jpg",
      "original_language": "en",
      "original_title": "Aquaman",
      "genre_ids": [28, 14, 878, 12],
      "backdrop_path": "/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg",
      "adult": false,
      "overview": "Arthur Curry learns that...",
      "release_date": "2018-12-07"
    }
    // ...
  ]
}
```

Si vous souhaitez Apollo GraphQL, il existe une version GraphQL de l'API ici : https://graphql-tmdb.herokuapp.com/.

Dans ce cas, vous devez mettre votre api key dans le header `Authorization` de vos requêtes, comme dans l'exemple qui suit :
```js
const httpLink = createHttpLink({
  uri: 'https://graphql-tmdb.herokuapp.com/graphql',
  headers: {
    authorization: `<YOUR_API_KEY>`,
  }
})
```

**Répartion des points:**

- (1pt) – vous récupérez au minimum 20 films.

- (2pt) – vous affichez la liste des films avec leur image de couverture.

- *(BONUS 0.5pt) – vous affichez plus de détails par films (titre, date de sortie, genres). La liste de tous les genres officiels est disponible à l'endpoint suivant:*

  ```
  http://api.themoviedb.org/3/genre/movie/list?api_key=<YOUR_API_KEY>
  ```


### 2. Films prochainement à l'affiche (2pt)

Vous allez devoir ici créer une deuxième vue affichant la liste des films prochainement en salles. Il doit être possible de naviguer entre les deux vues. Ces informations sont accesibles via l'endpoint suivant:

```
https://api.themoviedb.org/3/movie/upcoming?page=1?api_key=<YOUR_API_KEY>
```

La réponse à cette requête est similaire à celle de l'endpoint `/movie/popular`.



**Répartion des points:**

- (1pt) – vous affichez la liste des films prochainement projetés en salle avec leurs pochettes. Nous pour cette vue, nous vous demandons de récupérer au moins 100 films.
- (1pt) – il est possible de naviguer d’une vue à l’autre en cliquant sur un bouton (donc vue analyse <=> vue prochainement en salle). Il n’est pas nécessaire de mettre en place un *router* pour ce faire.
- *(BONUS 0.5pt) – vous récupérez exactement toutes les pages de résultats de manière dynamique.*

### 3. Sélection de films (2pt)

Le but de cette étape est de permettre à l'utilisateur de sélectionner/déselectionner des films. **Vous ajouterez cette fonctionnalité uniquement dans la vue "films populaires"** de l'étape 1.

**Répartion des points:**

- (1pt) – il est possible de cliquer sur un film pour le sélectionner/désélectionner. Vous maintenez une liste de films sélectionnés. Nous ne vous demandons pas de persister ces informations dans une quelconque base de donnée. Par exemple, si vous utilisez React, maintenir cette liste dans le `state` d’un composant est suffisant.
- (1pt) – l’interface indique l'état du film (sélectionné/désélectionné). Vous pouvez par exemple rajouter une bordure autour de la pochette de la manière la plus simple possible.

### 4. Recommandations (1pt)

Ici **vous devez utiliser la vue "films prochainement à l'affiche"** de l'étape 2 pour proposer des recommandations basées sur les préférences de l'utilisateur.
Fondamentalement, vous devez affiner les résultats reçus à l'endpoint `/movie/upcoming` dans la deuxième étape en gardant uniquement ceux qui correspondent à certains critères définis. Le choix et la définition de ces critères de filtre vous incombe, mais doit être réalisée selon la liste des films sélectionnés par l'utilisateur.

Répartion des points:

- (0.5pt) – vous avez appliqué un filtre sur les films prochainement à l'affiche afin d’en faire des suggestions.
- (0.5pt) – le filtre appliqué est basé sur une ou plusieurs propriétés des films sélectionnés par l’utilisateur.
- *(BONUS 0.5pt): les recommandations sont ordonnées selon leur pertinence.*

### 5. BONUS - Sécurisation de l'application avec un formulaire de login (1pt)
Dans cette étape **facultative**, vous pouvez développer une page de login afin de sécuriser votre application.

### 6. Qualité du code (1.25pt)

Les points de cette étape sont répartis de la manière suivante :

- (0.25pt) – la structure des fichiers est cohérente.
- (0.25pt) – tout code non utilisé est supprimé y compris les logs de debug dans la console.
- (0.25pt) – votre code est suffisament documenté lorsque cela est nécessaire.
- (0.25pt) – vous utilisez un linter.
- (0.25pt) – les variables d’environnement sont utilisées lorsque cela est nécessaire.
- *(BONUS 0.5pt) – les fonctions complexes sont également testées avec Mocha et Chai ou autres. Par exemple vous pouvez créer un test qui valide que la logique utilisée pour créer/trier les recommandations fonctionne correctement.*

### 7. Déploiement (1pt)

Finalement, vous devez déployer votre application statique sur la plateforme de votre choix. Pour gagner du temps, considérez l’utilisation de l’outil <https://zeit.co/now>.



## Option 2 : Movie Time (backend)

**Prélude**

_Tout comme le hibou, Djevijd est un homme qui préfère travailler la nuit. Tout le monde en est bien conscient. Il n'est cependant pas à blâmer : en effet, quoi de mieux que de repousser les ennuyeux problèmes à plus tard en exerçant la **fameuse** technique de l'autruche ? Osons le dire, c'est un procédé qui a su séduire et faire ses preuves parmi nombre d'entre nous.
Ceci dit, d'autres se questionnent quant aux occupations de notre protagoniste durant la journée. Que peut-il bien faire de son temps libre, mis à part la création de memes larbinesques ? Eh bien... Il regarde des films, pardi ! Même s'il est ouvert à tous les genres, ses préférences s'orientent tout de même sur les films comiques qu'il raffole. D'autres vous dirons mêmes qu'ils ont parfois pu entendre des rires féminins s'échapper de son ordinateur !
En bon procrastinateur, notre personnage vous demande aimablement de lui coder une petite API permettant de gérer des films, ainsi qu'une watchlist._

**Introduction**

Si vous optez pour cette option, vous allez devoir développer une API permettant de récupérer des informations sur des films. Depuis cette API, les utilisateurs auront la possibilité de récupérer une liste de films populaires et de gérer leur *watchlist* (liste des films à voir plus tard).

**Consigne**

- Mettre en place un environnement de développement backend (repo, linter) avec Node.js
- Implémenter une API REST ou GraphQL.
- Persister les données dans une base de donnée MongoDB avec un ORM tels que Mongoose ou équivalent.
- Implémenter les fonctionnalités et endpoints demandés dans les étapes qui suivent.
- Déployer votre application en ligne. Ne perdez pas trop de temps sur ce point, et mettez une priorité plus élevée sur les autres étapes si besoin.



### 1. Importer une collection de films (0.5pt)

Le fichier `movies.json` fourni contient une liste de 10’000 films à importer dans votre base de donnée. Pour cela vous pouvez utiliser la commande `mongoimport` expliquée ci-dessous.

**Example en localhost**

Cette commande peut être utilisé de la manière suivante pour importer un fichier dans une base de donnée locale.

```
mongoimport --host localhost --port 27017 --db movie-time --collection movies --drop --file data/movies.json --jsonArray
```

 `--drop` permet de vider la collection avant l'importation, `--jsonArray` permet d'importer un tableau JSON et `db` est le nom de la base de donnée.



**Exemple avec Mongo Atlas**

Lors du déploiement de votre API, vous aurez également besoin d'une base de donnée en ligne. Pour cela vous pouvez par exemple utiliser [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Afin de pouvoir exécuter la commande `mongoimport` vous devez au préalable : 

- posséder un compte Mongo Atlas avec un cluster actif.

- avoir créé un MongoDB user configurable depuis l’onglet "Clusters > Security > MongoDB users".

- avoir inclu l'adresse IP courante dans la whitelist depuis l'onglet "Clusters > Security > IP Whitelist".

- connaître la valeur du `DATABASE_HOST`, qui doit avoir la forme suivante:

  ```
  <NOM_DU_REPLICASET>/<HOST_1:port>,<HOST_2:port>,<HOST_3:port>
  ```
  Pour trouver cette url ainsi que la commande à exécuter, naviguez vers l'onglet "Command Line tools" de votre cluster.

```
mongoimport --host myAtlasRS/atlas-host1:27017,atlas-host2:27017,atlas-host3:27017 --ssl --username myAtlasUsername --password myAtlasPassword --authenticationDatabase admin --db movie-time --collection movies --jsonArray --file data/movies.json
```



**Vérification**

Si l’opération s’est bien déroulée, le message `imported 10000 documents` devrait s'afficher dans le terminal.



**Répartion des points:**

- (1pt) – Les films ont étés importés dans un MongoDB local ou distant. Ajoutez un screenshot du résultat de l'opération dans votre README.md.


### 2. Liste des films (3pt)

Une fois la collection de films importée, vous allez devoir créer un model `Movie` ainsi qu'un endpoint permettant de récupérer une liste paginée des films.

**Répartion des points:**

- (1pt) – vous avez utilisé l’ORM de votre choix pour créer le model `Movie` contenant toutes les propriétés définies dans le dataset.
- (1pt) – vous avez créé un endpoint /movies permettant de récupérer la liste complète des films.
- (1pt) - vous avez utilisé la méthode de votre choix pour paginer les résultats de cet endpoint.



### 3. Authentification (3pt)

Dans cette étape vous allez devoir créer un model `User` ainsi qu'un endpoint permettant de créer un utilisateur et de s'authentifier. Pour ce faire, vous avez le choix d'utiliser les outils que vous souhaitez (tels que [passportjs](http://www.passportjs.org), par exemple), la seule condition étant que les utilisateurs soient stockés dans votre base de donnée MongoDB.

Si vous optez pour une solution avec [express](https://expressjs.com/fr/) + [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) vous pouvez vous baser sur les exemples suivants:

- `/auth/register` (création d'un nouvel utilisateur) :

  ```js
  app.post('/auth/register', (req, res) => {
    const { username, password } = req.body;
    // register a user and send 201 Created.
  });
  ```

- `/auth/login` (authentification) :

  ```js
  const jwt = require('jsonwebtoken');
  
  app.post('auth/login', (req, res) => {
    const { username, password } = req.body;
    // check the credentials
    // generate a token token -> jwt.sign()
    // include the userId inside the token's payload
    // if the check fails, send 401 Unauthorized
  })
  ```

- *(Bonus) middleware d'authentification*

  ```js
  const jwt = require('jsonwebtoken');
  
  app.use((req, res, next) => {
    const token = req.headers.authorization;
    // verify the token -> jwt.verify()
    // attach the payload to req.user
    // call next() when you're done
  })
  ```


**Répartition des points:**

- (1pt) – le Model `User` contient au minium le nom d'utilisateur ou l'email, ainsi que le mot de passe. Pour ce challenge, nous acceptons les mots de passe stockés en clair à condition qu’ils ne soient jamais retournés à l’utilisateur.
- (1pt) – lors de la création d'un nouvel utilisateur, l'API envoie le status `201 Created`. Le nom d'utilisateur et l'email sont uniques.
- (1pt) – lors du login, l'API retourne un token de type JWT qui contient au minimum l'id de l'utilisateur.
- *(BONUS 0.5pt) – vous avez implémenté (à la main ou à l'aide d'une libraire) un middleware qui attache l’utilisateur courant à l’objet requête `req.user`.* 

### 4. Watchlist (2pt)

Vous allez ici devoir ajouter et implémenter la fonctionnalité *watchlist* (liste de films à regarder) liée aux utilisateurs. Pour ce faire, vous devez adapter la structure de la base de donnée et ajouter des endpoints permettant de récupérer des *watchlists* et de les modifier.

**Répartition des points:**

- (1pt) - il est possible de récupérer la liste des films se trouvant dans la watchlist d’un utilisateur (retourner une liste d’identifiants n’est pas suffisant).
- (1pt) – il est possible d'ajouter un film dans la *watchlist* d’un utilisateur. 
- *(BONUS 0.5pt) : vous avez sécurisé les endpoints afin de les rendres accessibles uniquement aux utilisateurs connectés. Utiliser l’id de l’utilisateur connecté lors de l’ajout d’un film dans une watchlist.*



### 5. (Bonus) Formulaire de login (0.5pt)

Vous implémentez une application statique avec un formulaire de login.



### 6. Qualité du code (1.25pt)

Les points pour cette étape sont répartis de la manière suivante :

- (0.25pt) – la structure des fichiers est cohérente.
- (0.25pt) – tout code non utilisé est supprimé y compris les logs de debug dans la console.
- (0.25pt) – votre code est suffisament documenté lorsque cela est nécessaire.
- (0.25pt) – vous utilisez un linter.
-  (0.25pt) – les variables d’environnement sont utilisées lorsque cela est nécessaire.
- *(BONUS 0.5pt): vous avez créé au moins un test unitaire afin de valider la fonctionnalité de votre choix.*

### 7. Déploiement (0.5pt)

Finalement vous devez déployer votre API et votre base de données sur la plateforme de votre choix.
