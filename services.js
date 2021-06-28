const fs = require('fs').promises;

async function getAllTalkers() {
  try {
    const data = await fs.readFile('./talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    const errorObj = {
      status: error.status || 500,
      message: error.message,
    };
    return errorObj;
  }
}

async function getTalkerById(id) {
  try {
    const data = await getAllTalkers();
    const talkerData = data.find((talker) => talker.id === Number(id));
    if (!talkerData) throw new Error();
      return talkerData;
  } catch (error) {
    const errorObj = {
      status: 404,
      message: 'Pessoa palestrante não encontrada',
    };
    return errorObj;
  }
}

async function saveNewTalker(talker) {
  try {
    const data = await getAllTalkers();
    const newTalker = {
      name: talker.name,
      age: talker.age,
      id: data.length + 1,
      talk: talker.talk,
    };
    data.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(data));
    return newTalker;
  } catch (error) {
    const errorObj = { status: 500, message: 'Erro ao adicionar palestrante' };
    return errorObj;
  }
}

async function editTalker(talkerId, talkerInfo) {
  const { name, age, talk } = talkerInfo;
  try {
    const talkerData = await getAllTalkers();
    const newTalkerData = talkerData.filter((person) => person.id !== talkerId);
    const newTalker = {
      name,
      age,
      id: talkerId,
      talk,
    };
    newTalkerData.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(newTalkerData));
    return newTalker;
  } catch (error) {
    const errorObj = { status: 500, message: 'Erro ao editar palestrante' };
    return errorObj;
  }
}

async function deleteTalker(id) {
  try {
    const data = await getAllTalkers();
    console.log(data);
    if (!data.some((person) => person.id === id)) throw new Error();
    const newData = data.filter((person) => person.id !== id);
    console.log(newData);
    await fs.writeFile('./talker.json', JSON.stringify(newData));
    return newData;
  } catch (error) {
    const errorObj = { status: 500, message: 'Erro ao editar palestrante' };
    return errorObj;
  }
}

module.exports = {
  getAllTalkers,
  getTalkerById,
  saveNewTalker,
  editTalker,
  deleteTalker,
};
