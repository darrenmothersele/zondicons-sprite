const fs = require('fs-extra');
const SVGO = require('svgo');
const svgo = new SVGO();
const nunjucks = require('nunjucks');

(async () => {

  const iconFilenames = (await fs.readdir('zondicons')).filter(filename => filename.endsWith('.svg'));

  const icons = await Promise.all(
    iconFilenames
      .map(filename => `zondicons/${filename}`)
      .map(
        path => fs.readFile(path, 'utf8')
          .then(data => svgo.optimize(data, {path}))
          .then(({data, path}) => ({
            data,
            length: Buffer.byteLength(data, 'utf8'),
            id: path.replace('zondicons/', '').replace('.svg', '')
          }))
      )
  );

  nunjucks.configure('templates', { autoescape: true });
  const output = nunjucks.render('template.njk', { icons });

  await fs.outputFile('docs/index.html', output);

})();
