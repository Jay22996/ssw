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

const Mark = sequelize.define('Mark', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  ref_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hindi: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  english: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  maths: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  gujarati: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  science: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'student_report',
  timestamps: true
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('User matk (student_data) created successfully.');
  })
  .catch(err => {
    console.error('Error creating User table (student_data):', err);
  });

module.exports = Mark;
