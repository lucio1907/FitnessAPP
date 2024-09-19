import NotFoundException from "../../errors/NotFoundException";
import ExercisesModel from "../../models/Exercises.models";

class GetExercisesService {
    private collection;

    constructor() {
        this.collection = ExercisesModel;
    }

    public get = async () => {
        const getall = await this.collection.findAll();

        if (getall.length === 0) throw new NotFoundException('No exercises added');

        return getall;
    }
};

const getExercisesService = new GetExercisesService();
export default getExercisesService;