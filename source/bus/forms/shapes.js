// Core
import { object, string} from 'yup';

export const composer = {
    shape: {
        comment: '',
    },
    schema: object().shape({
        comment: string()
            .required()
            .max(50),
    }),
};
