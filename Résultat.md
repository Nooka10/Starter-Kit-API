# The Movie Challenge

## Option 2 : Movie Time (backend)

### 1. Importer une collection de films (0.5pt)

**Répartion des points:**

- (1pt) – Les films ont étés importés dans un MongoDB local ou distant. Ajoutez un screenshot du résultat de l'opération dans votre README.md.

![resultatImport](resultatImport.png)


### 2. Liste des films (3pt)

Une fois la collection de films importée, vous allez devoir créer un model `Movie` ainsi qu'un endpoint permettant de récupérer une liste paginée des films.

**Répartion des points:**

- (1pt) – vous avez utilisé l’ORM de votre choix pour créer le model `Movie` contenant toutes les propriétés définies dans le dataset.
- (1pt) – vous avez créé un endpoint /movies permettant de récupérer la liste complète des films.
- (1pt) - vous avez utilisé la méthode de votre choix pour paginer les résultats de cet endpoint.

2 endpoints:

- ```
  # Retourne tous les films de la base de données.
  movies(nbMoviesPerPage: Int, page: Int): [Movies!]!
  
  # Retourne le film correspondant au 'movieId' reçu.
  movie(movieId: ID!) : Movies
  ```

### 3. Authentification (3pt)

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
