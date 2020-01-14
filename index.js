const fs = require('fs-extra');
const SVGO = require('svgo');

const svgo = new SVGO();

(async () => {

  const icons = (await fs.readdir('zondicons')).filter(filename => filename.endsWith('.svg'));

  const all = await Promise.all(
    icons
      .map(filename => `zondicons/${filename}`)
      .map(path => fs.readFile(path, 'utf8')
        .then(data => svgo.optimize(data, {path})))
  );

  const mapped = all
    .map(({data, path}) => ({data, id: path.replace('zondicons/', '').replace('.svg', '')}))
    .map(({ data, id }) => data
      .replace('<svg xmlns=\"http://www.w3.org/2000/svg\"', `<symbol id="${id}"`)
      .replace('</svg>', '</symbol>')
    ).join("\n");

  await fs.writeFile('sprite.svg', `<svg xmlns="http://www.w3.org/2000/svg">\n${mapped}\n</svg>`);

}
)();
