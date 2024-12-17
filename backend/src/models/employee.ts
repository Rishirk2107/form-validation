import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

class Employee extends Model {}

Employee.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfJoining: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
  }
);

export default Employee;
