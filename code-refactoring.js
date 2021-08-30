const database = {
    getUser: (id) => {
        return new Promise((resolve, reject) => {
          const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];
        
        const user = users.find((user) => user.id === id);
        if (!user) {
            reject(`User with id=${id} not found`);
        } else {
            resolve(user);
        }
        });
    },
    getUsersBook: (userId) => {
        return new Promise((resolve, reject) => {
          const usersBooks = {
            1: [],
            2: [1, 2],
        };

        const userBook = usersBooks[userId];
        if (!userBook) {
            reject(`Set of books related to userId=${userId} not found`);
        } else {
            resolve(userBook);
        }
        });
    },
    buyBook: (id) => {
        return new Promise((resolve, reject) => {
          const books = [{
            id: 1,
            name: 'Art of war'
        }, {
            id: 2,
            name: 'Hunger games'
        }, {
            id: 3,
            name: '1984'
        }];

        const book = books.find((book) => book.id === id);
        if (!book) {
            reject(`Book with id=${id} not found`);
        } else {
            resolve(true);
        }
        });
    },
};

const buyBookForUser = async (bookId, userId, callback) => {
  try {
    const user = await database.getUser(userId);
    const userBooks = await database.getUsersBook(userId);

    if (userBooks.includes(bookId)) {
        callback(`User already has book with id=${bookId}`);
    } else {
        await database.buyBook(bookId);

        callback(null, 'Success');
    }
  } catch (e) {
    callback(e);
  }
}