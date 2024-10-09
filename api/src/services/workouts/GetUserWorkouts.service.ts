import NotFoundException from "../../errors/NotFoundException";
import UsersModel from "../../models/Users.models";
import WorkoutsModel from "../../models/Workouts.models";

class GetUserWorkoutsService {
  private collection;

  constructor() {
    this.collection = UsersModel;
  }

  public get = async (user_id: string) => {
    const getWorkouts = await this.collection.findOne({
      where: { user_id },
      include: [
        {
          model: WorkoutsModel,
          attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
          include: [
            {
              model: UsersModel,
              attributes: {
                exclude: ["user_id", "password", "email", "phone"],
              },
            },
          ],
        },
      ],
      attributes: { exclude: ["password"] },
      order: [[WorkoutsModel, 'createdAt', 'DESC']],
    });

    if (!getWorkouts) throw new NotFoundException("Workouts not found");
    if (getWorkouts.dataValues.workouts.length === 0)
      throw new NotFoundException('You dont have workouts yet');

    return { message: "Done", workouts: getWorkouts };
  };
}

const getUserWorkoutsService = new GetUserWorkoutsService();
export default getUserWorkoutsService;
