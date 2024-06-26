const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('jaydemo', 'jay', 'jay123456789', {
  host: '192.168.29.90',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      instanceName: 'SQLEXPRESS',
      encrypt: true,
      trustServerCertificate: true
    }
  }
});

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'student_data', // Ensure the table name matches your database schema
  timestamps: true
});

// Synchronize the model with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('User table (student_data) created successfully.');
  })
  .catch(err => {
    console.error('Error creating User table (student_data):', err);
  });

module.exports = User;
