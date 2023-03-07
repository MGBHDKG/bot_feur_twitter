import fs from 'fs';

export function saveJSON(data)
{
    fs.writeFile('./tweetFeured.json', JSON.stringify(data), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Le fichier a été sauvegardé !');
      });
}