module.exports = {
  tableName: 'users',
  columns: {
    id: 'INT PRIMARY KEY AUTO_INCREMENT',
    email: 'VARCHAR(100)',
    password: 'VARCHAR(255)',
  },
};
