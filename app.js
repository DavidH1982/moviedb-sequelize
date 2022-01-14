require("dotenv").config();
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const commandLineInput = yargs(hideBin(process.argv)).argv;

// const app = (commandLineInput) => {         //semantic connection, parameter can be called anything
//     if (commandLineInput.add) {
//         if (commandLineInput.movies) {
//             console.log(`We are adding ${commandLineInput.movies} with the actor ${commandLineInput.actor}`);
//         } else if (commandLineInput.albums) {
//             console.log("We are adding to Albums")
//         }
//     } else if (commandLineInput._) {
//         console.log("We have list")
//     }
// };

// app(commandLineInput);

const { Movie } = require("./models/models");
const connection = require("./db/connection");
const { addMovie, listMovies, updateMovies, findMovie, delMovie } = require("./utils/index");
const { command } = require("yargs");

const app = async (commandLineInput) => {
    try {
        await connection.authenticate();
    } catch (error) {
        console.log(error);
    }
    
    try {
        if (commandLineInput.add) {
            await Movie.sync({alter: true})
            await addMovie(
                {
                    title: commandLineInput.title,
                    actor: commandLineInput.actor,
                    rating: commandLineInput.rating
                });
        } else if (commandLineInput.list) {
            await listMovies();
        } else if (commandLineInput.find) {
            await findMovie();
        }
        else if (commandLineInput.update) {
            await updateMovies(
                {
                    title: commandLineInput.title,
                    new_title: commandLineInput.new_title
                });
        } else if (commandLineInput.del) {
            await delMovie();
        }
        connection.close();
        process.exit();
    } catch (error) {
        console.log(error)
    }
};

app(commandLineInput);