const { Sequelize, DataTypes} = require("sequelize");
const connection = require("../db/connection");
const { setApproval, firstUpper } = require("./modelHelpers");

const Movie = connection.define("Movies", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('title');
            return firstUpper(rawValue);
        }
    },
    actor: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('actor');
            return firstUpper(rawValue);
        }
    },
    approval: {                             //bad, average, good based upon rating inputted
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('approval');
            return firstUpper(rawValue);
        }
    },
    rating: {                               //0-10
        type: DataTypes.INTEGER,
        allowNull: false,
        set(value) {
            this.setDataValue('approval', setApproval(value));
            this.setDataValue('rating', value);
        }
    }
});

module.exports = {
    Movie
};