import app from "./app";
import configServer from "./config/configServer.config";
import sequelizeConfig from "./config/sequelize.config";
import "./models/associations"

const main = async (): Promise<void> => {
  try {
    await sequelizeConfig.sync({ force: false, alter: true });

    const PORT: number = configServer.server.port as number;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Unable to connect to the database");
    console.log(error)
  }
};

main();
