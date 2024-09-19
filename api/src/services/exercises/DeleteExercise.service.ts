import NotFoundException from "../../errors/NotFoundException";
import ExercisesModel from "../../models/Exercises.models";

class DeleteExerciseService {
    private collection;

    constructor() {
        this.collection = ExercisesModel;
    }

    public delete = async (exercise_id: string) => {
        const exerciseDeleted = await this.collection.destroy({ where: { exercise_id } })
        if (exerciseDeleted === 0) throw new NotFoundException('Exercise not found');
        
        return { message: 'Exercise deleted!', exerciseDeleted };
    };
};

const deleteExerciseService = new DeleteExerciseService();
export default deleteExerciseService;