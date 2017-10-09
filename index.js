const {
  Chromeless
} = require('chromeless')

async function run() {
  const chromeless = new Chromeless()

  const links = await chromeless
    .goto('http://www.filmesonlinehd7.cc/')
    .wait('.main')
    .evaluate(() => {
      const links = [].map.call(
        document.querySelectorAll('.main .ui.card'),
        a => ({
          title: a.innerText,
          href: a.href
        })
      )
      return links;
    });

  console.log(links.length);
  let cont = 0;
  for (var a of links) {
    console.log(cont);
    //console.log(a);
    var result = await getMovieInfo(chromeless, a.href);
    console.log(result);
    cont++;
  }

  await chromeless.end();
}

async function getMovieInfo(chromeless, url) {
  console.log('Getting: '+url);
  const links = await chromeless
    .goto(url)
    .wait(5000)
    .evaluate(() => {
      const title = document.querySelectorAll('.ui.inverted > table > tbody > tr:nth-child(1) > td:nth-child(2)')[0].textContent;
      //pegar links
      const iFrame = document.querySelectorAll('div.ui.embed.dimmable')[0].dataset.url;

      return {
        title: title,
        year: 2017,
        iframe: iFrame,
        links:[{
          url: 'vazio'
        }]
      };
    });
  return links;
}

run().catch(console.error.bind(console))

//processo
/*
1. pegar nome do filme
2. buscar no tmdb pelo ID do filme
3. pegar os links do filme
4. gravar os links com o ID do filme no banco de dados

*/