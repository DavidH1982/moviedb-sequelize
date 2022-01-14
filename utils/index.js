const { Sequelize } = require("sequelize");
const { Movie } = require("../models/models");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const commandLineInput = yargs(hideBin(process.argv)).argv;

const addMovie = async (movieObj) => {
    try {
        const movie = await Movie.create(movieObj);
        console.log(`We added ${movie.title}.`);
    } catch (error) {
        console.log(error);
    }
};

const listMovies = async () => {
    try {
        const movies = await Movie.findAll({});
        console.log(movies.every(user => user instanceof Movie));
        console.log("All Movies: ", JSON.stringify(movies, null, 2));
    } catch (error) {
        console.log(error);
    }
}

const findMovie = async () => {
    try {
        const movie = await Movie.findOne({ where: {title: commandLineInput.title}});
        if(movie === null){
            console.log(`"${commandLineInput.title}" has returned no results.`)
        } else {
            console.log(JSON.stringify(movie, null, 2));
        }
    } catch (error) {
        console.log(error);
    }
}

const updateMovies = async () => {
    try {
        const movie = await Movie.findOne({ where: {title: commandLineInput.title}});
        movie.title = commandLineInput.new_title;
        console.log(`${commandLineInput.title} has been updated to ${movie.title}`);
        await movie.save()
        console.log(JSON.stringify(movie, null, 2));
    } catch (error) {
        console.log(error)
    }
}

const delMovie = async () => {
    try {
        const movie = await Movie.findOne({ where: {title: commandLineInput.title}});
        console.log(`${movie.title} has been removed from the database`);
        await movie.destroy();
    } catch (error) {
        
    }
}

module.exports = {
    addMovie,
    listMovies,
    findMovie,
    updateMovies,
    delMovie
};