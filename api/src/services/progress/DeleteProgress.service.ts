import NotFoundException from "../../errors/NotFoundException";
import ProgressModel from "../../models/Progress.models";

class DeleteProgressService {
    private collection;

    constructor() {
        this.collection = ProgressModel;
    }

    public delete = async (id: string) => {
        const progressDeleted = await this.collection.destroy({ where: { id } });
        if (progressDeleted === 0) throw new NotFoundException('Progress ID not found');

        return { message: 'Progress deleted!', progressDeleted };
    };
};

const deleteProgressService = new DeleteProgressService();
export default deleteProgressService;