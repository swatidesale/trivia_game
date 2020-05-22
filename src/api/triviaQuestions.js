export const getQuizData = () => {
  return fetch(
    `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
  )
    .then(response => {
      if(response.status == 200)
        return response.json()
    })
    .catch((err) => {
      throw new Error(`Fetching quiz data failed ${err}`);
    });
};
