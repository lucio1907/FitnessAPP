import NotFoundException from "../../errors/NotFoundException";
import WorkoutsModel from "../../models/Workouts.models";

class DeleteWorkoutService {
    private collection;

    constructor() {
        this.collection = WorkoutsModel;
    }

    public delete = async (workout_id: string) => {
        const workoutDeleted = await this.collection.destroy({ where: { workout_id } });
        if (workoutDeleted === 0) throw new NotFoundException('Workout not found');

        return { message: 'Workout deleted!', workoutDeleted };
    };
};

const deleteWorkoutService = new DeleteWorkoutService();
export default deleteWorkoutService;