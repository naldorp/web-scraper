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
      //return JSON.stringify(links);
      return links;
    });

  console.log(links.length);
  let cont = 0;
  for (var a of links) {
    console.log(cont);
    var result = await getMovieTitle(chromeless, a.href);
    console.log(result);
    cont++;
  }

  await chromeless.end();
}

async function getMovieTitle(chromeless, url) {
  console.log('Getting: '+url);
  const links = await chromeless
    .goto(url)
    .wait(5000)
    .evaluate(() => {
      const links = [].map.call(
        document.querySelectorAll('div.ui.embed.dimmable'),
        div => ({
          url: div.dataset.url
        })
      )
      return links;
    });
  return links;
}

run().catch(console.error.bind(console))