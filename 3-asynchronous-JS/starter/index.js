const { error } = require('console');
const fs = require('fs');
const superAgent = require('superagent');
const { reject, resolve } = require('superagent/lib/request-base');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superAgent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

//Promises
const readFileProm = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('I could not find that file to write');
      resolve('Success, file written');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFileProm(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFileProm('dog-img.txt', imgs.join('\n'));
    console.log('Random dog photo saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get the dog pics');
    const dogPic = await getDogPic();
    console.log(dogPic);
    console.log('3: Done');
  } catch (err) {
    console.log('ERROR!');
  }
})();
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done');
//   })
//   .catch((error) => {
//     console.log('ERROR!');
//   });

// readFileProm(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFileProm('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog photo saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
