import NotFoundException from "../../errors/NotFoundException";
import UsersModel from "../../models/Users.models";
import WorkoutsModel from "../../models/Workouts.models";

class GetWorkoutsService {
  private collection;

  constructor() {
    this.collection = WorkoutsModel;
  }

  public get = async () => {
    const workouts = await this.collection.findAll({
      include: [
        {
          model: UsersModel,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
      attributes: { exclude: ["updatedAt", "user_id"] },
    });

    if (workouts.length === 0) throw new NotFoundException("No workouts");
    return { message: "Done", workouts };
  };
}

const getWorkoutsService = new GetWorkoutsService();
export default getWorkoutsService;
