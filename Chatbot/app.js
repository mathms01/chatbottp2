const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint du webhook
app.post('/dialogflow/webhook', express.json(), (request, response) => {
    var parameters = request.body.queryResult.parameters;
    var displayName = request.body.queryResult.intent.displayName;
    var data = require('./resource.json');

  switch (JSON.stringify(displayName)) {
    case '"JO trouver un sport par son nom"':

    var sports = new Map();
    data.sports.forEach( sport => {
        if(sport.name==parameters.sport)
        {
            sports.set(sport.name, sport);
        }
    })

    var result = "";
    if(sports.size > 0)
    {
        result += "\n";
        result += sports.get(parameters.sport).name;
        result += "\n";
        result += sports.get(parameters.sport).description;
        result += "\n";
        result += "Le pays avec le plus de médailles est : ";
        result += sports.get(parameters.sport).countryWithMoreMedals;
        result += "\n";
        result += "Le nombre d'épreuve est : ";
        result += sports.get(parameters.sport).nbEpreuves;
        result += "\n";
        result += "Le nombre d'atheletes est : ";
        result += sports.get(parameters.sport).nbAthletes;

    }

      response.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                'Tu as choisi de rechercher un ou des sports 🏀',
                result
              ]
            }
          }
        ]
      });
      break;

    case '"JO trouver un athlete par son nom et/ou pays"':
        var atheletes = new Map();
    data.athletes.forEach( athlete => {
        if(athlete.name==parameters.person.name)
        {
            atheletes.set(athlete.name, athlete);
        }
    })

    var result = "";
    if(atheletes.size > 0)
    {
        result += "\n";
        result += atheletes.get(parameters.person.name).name;
        result += "\n vient de ";
        result += atheletes.get(parameters.person.name).country;
        result += "\n";
        result += "Nombre de médailles : ";
        result += atheletes.get(parameters.person.name).medals;
        result += "\n";
        result += "Discipline : ";
        result += atheletes.get(parameters.person.name).sport;

    }

    console.log(result);
    
      response.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                'Tu as choisi de rechercher un ou des athlètes 🏋🏻‍♀️',
                result
              ]
            }
          }
        ]
      });
      break;

    default:
      response.json({
        fulfillmentMessages: [
          {
            text: {
              text: [
                'Je ne suis pas sûr d\'avoir la réponse... réponse depuis le serveur...'
              ]
            }
          }
        ]
      });
  }
});

const listener = app.listen(3000, () => {
  console.log('🚀 L\'application est lancée sur le port ' + listener.address().port);
});