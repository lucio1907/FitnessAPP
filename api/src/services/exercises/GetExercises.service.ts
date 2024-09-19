import ExercisesModel from "../../models/Exercises.models";

class GetExercisesService {
    private collection;

    constructor() {
        this.collection = ExercisesModel;
    }

    public get = async () => {
        const getall = await this.collection.findAll();
        return getall;
    }
};

const getExercisesService = new GetExercisesService();
export default getExercisesService;