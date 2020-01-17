const fs = require('fs-extra');
const SVGO = require('svgo');
const svgo = new SVGO({
  plugins: [
    {
      removeDimensions: true,
    }
  ]
});
const nunjucks = require('nunjucks');

(async () => {

  const iconFilenames = (await fs.readdir('entypo')).filter(filename => filename.endsWith('.svg'));

  const icons = await Promise.all(
    iconFilenames
      .map(filename => `entypo/${filename}`)
      .map(
        path => fs.readFile(path, 'utf8')
          .then(data => svgo.optimize(data, {path}))
          .then(({data, path}) => ({
            data,
            length: Buffer.byteLength(data, 'utf8'),
            id: path.replace('entypo/', '').replace('.svg', '')
          }))
      )
  );

  nunjucks.configure('templates', { autoescape: true });
  const output = nunjucks.render('template.njk', { icons });

  await fs.outputFile('docs/entypo.html', output);

})();
